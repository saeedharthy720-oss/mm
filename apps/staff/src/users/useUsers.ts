import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  isActive: boolean;
  createdAt: string;
}

const USERS_KEY = ["users"];

export function useUsers() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<{ users: StaffUser[] }>("/api/v1/users");
      return data.users;
    }
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { name: string; email: string; password: string; roleKey: string }) => {
      const { data } = await apiClient.post<{ user: StaffUser }>("/api/v1/users", input);
      return data.user;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY })
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: { id: string; name?: string; isActive?: boolean; roleKey?: string }) => {
      const { data } = await apiClient.patch<{ user: StaffUser }>(`/api/v1/users/${id}`, input);
      return data.user;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY })
  });
}
