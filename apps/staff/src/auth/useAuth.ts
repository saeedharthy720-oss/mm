import type { AuthUser, LoginRequest } from "@bms/shared-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

const ME_QUERY_KEY = ["auth", "me"];

async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data } = await apiClient.get<{ user: AuthUser }>("/api/v1/auth/me");
    return data.user;
  } catch {
    return null;
  }
}

export function useCurrentUser() {
  return useQuery({ queryKey: ME_QUERY_KEY, queryFn: fetchCurrentUser });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LoginRequest) => {
      const { data } = await apiClient.post<{ user: AuthUser }>("/api/v1/auth/login", input);
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(ME_QUERY_KEY, user);
    }
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/api/v1/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(ME_QUERY_KEY, null);
    }
  });
}
