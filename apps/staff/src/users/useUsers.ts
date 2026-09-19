import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient.js";

export interface StaffUser {
  whatsappNumber: string | null;
  receivesOrderNotifications: boolean;
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
      try {
        const { data } = await apiClient.get<{ permissions: AssignablePermission[] }>(
          "/api/v1/users/permissions"
        );
        return data.permissions ?? [];
      } catch {
        // An API that predates this endpoint answers 404. Returning nothing
        // hides the permission controls rather than showing broken ones.
        return [];
      }
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
      // The dashboard and the API deploy separately, so this can briefly meet a
      // version that predates per-user permissions. Defaulting the lists keeps
      // the page working instead of crashing on undefined.includes().
      return data.users.map((user) => ({
        ...user,
        permissions: user.permissions ?? [],
        rolePermissions: user.rolePermissions ?? [],
        extraPermissions: user.extraPermissions ?? []
      }));
    }
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      email: string;
      password: string;
      roleKey: string;
      whatsappNumber?: string;
      receivesOrderNotifications?: boolean;
    }) => {
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
      whatsappNumber?: string;
      receivesOrderNotifications?: boolean;
    }) => {
      const { data } = await apiClient.patch<{ user: StaffUser }>(`/api/v1/users/${id}`, input);
      return data.user;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY })
  });
}

export interface NotificationRecipient {
  id: string;
  name: string;
  whatsappNumber: string;
}

/**
 * Staff to forward a new order to. Reachable by anyone with orders:view, since
 * whoever is working the queue needs it — not just admins.
 */
export function useNotificationRecipients() {
  return useQuery({
    queryKey: ["notification-recipients"],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ recipients: NotificationRecipient[] }>(
          "/api/v1/users/notification-recipients"
        );
        return data.recipients ?? [];
      } catch {
        // An API predating this endpoint answers 404; no recipients simply
        // hides the forwarding row.
        return [];
      }
    },
    staleTime: 5 * 60 * 1000
  });
}
