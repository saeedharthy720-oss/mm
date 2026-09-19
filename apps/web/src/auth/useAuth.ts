import type { AuthUser, LoginRequest, RegisterRequest } from "@bms/shared-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

const ME_QUERY_KEY = ["auth", "me"];

async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data } = await apiClient.get<{ user: AuthUser }>("/api/v1/auth/me");
    return data.user;
  } catch {
    // Not signed in is the normal case on a storefront, not an error worth
    // surfacing — shoppers browse and check out as guests.
    return null;
  }
}

export function useCurrentUser() {
  return useQuery({ queryKey: ME_QUERY_KEY, queryFn: fetchCurrentUser, staleTime: 60 * 1000 });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LoginRequest) => {
      const { data } = await apiClient.post<{ user: AuthUser }>("/api/v1/auth/login", input);
      return data.user;
    },
    onSuccess: (user) => queryClient.setQueryData(ME_QUERY_KEY, user)
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: RegisterRequest) => {
      const { data } = await apiClient.post<{ user: AuthUser }>("/api/v1/auth/register", input);
      return data.user;
    },
    onSuccess: (user) => queryClient.setQueryData(ME_QUERY_KEY, user)
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
      // Anything fetched while signed in belongs to that session.
      queryClient.removeQueries({ queryKey: ["my-orders"] });
    }
  });
}
