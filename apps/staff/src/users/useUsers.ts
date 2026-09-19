import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  isActive: boolean;
  createdAt: string;
  /** Role grants plus direct grants — what this person can actually do. */
  permissions: string[];
  /** Comes with the role; shown as fixed. */
  rolePermissions: string[];
  /** Granted to this person specifically; this is what the checkboxes edit. */
  extraPermissions: string[];
}

export interface AssignablePermission {
  key: string;
  description: string | null;
}

export function useAssignablePermissions() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ permissions: AssignablePermission[] }>(
        "/api/v1/users/permissions"
      );
      return data.permissions;
    },
    staleTime: 5 * 60 * 1000
  });
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
    mutationFn: async ({
      id,
      ...input
    }: {
      id: string;
      name?: string;
      isActive?: boolean;
      roleKey?: string;
      extraPermissions?: string[];
    }) => {
      const { data } = await apiClient.patch<{ user: StaffUser }>(`/api/v1/users/${id}`, input);
      return data.user;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY })
  });
}
