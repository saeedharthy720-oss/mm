import { AlertCircle, Check, Loader2, ShieldCheck, UserPlus, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../auth/useAuth.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";
import {
  useAssignablePermissions,
  useCreateUser,
  useUpdateUser,
  useUsers,
  type StaffUser
} from "./useUsers.js";

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium";

const emptyForm = { name: "", email: "", password: "", roleKey: "employee" };

export function StaffUsersPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data: currentUser } = useCurrentUser();
  const { data: users = [], isLoading } = useUsers();
  const { data: permissions = [] } = useAssignablePermissions();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [createdName, setCreatedName] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setCreatedName(null);

    try {
      const created = await createUser.mutateAsync(form);
      setCreatedName(created.name);
      setForm(emptyForm);
    } catch (err) {
      setError(getErrorMessage(err, t("common.saveFailed")));
    }
  }

  function roleLabel(role: StaffUser["role"]) {
    return role === "admin" ? t("staff.roleAdmin") : t("staff.roleEmployee");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Users className="h-5 w-5" />
        </span>
        <h1 className="text-2xl font-bold">{t("staff.title")}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-card-border bg-card p-5 shadow-sm">
        <h2 className="font-bold">{t("staff.addNew")}</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="staffName">
              {t("staff.name")}
            </label>
            <input
              id="staffName"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="staffEmail">
              {t("staff.email")}
            </label>
            <input
              id="staffEmail"
              type="email"
              required
              dir="ltr"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="staffPassword">
              {t("staff.password")}
            </label>
            <input
              id="staffPassword"
              type="password"
              required
              minLength={8}
              dir="ltr"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={fieldClass}
            />
            <p className="mt-1 text-xs text-muted-foreground">{t("staff.passwordHint")}</p>
          </div>
          <div>
            <label className={labelClass} htmlFor="staffRole">
              {t("staff.role")}
            </label>
            <select
              id="staffRole"
              value={form.roleKey}
              onChange={(e) => setForm({ ...form, roleKey: e.target.value })}
              className={fieldClass}
            >
              <option value="employee">{t("staff.roleEmployee")}</option>
              <option value="admin">{t("staff.roleAdmin")}</option>
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              {form.roleKey === "admin" ? t("staff.adminHint") : t("staff.employeeHint")}
            </p>
          </div>
        </div>

        {error && (
          <p className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        )}

        {createdName && !error && (
          <p className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm font-medium text-emerald-700">
            <Check className="h-4 w-4 shrink-0" />
            {t("staff.created", { name: createdName })}
          </p>
        )}

        <button
          type="submit"
          disabled={createUser.isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {createUser.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
          {createUser.isPending ? t("common.saving") : t("staff.addButton")}
        </button>
      </form>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          users.map((staffUser) => {
            const isSelf = staffUser.id === currentUser?.id;
            return (
              <div
                key={staffUser.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-card-border bg-card p-4 shadow-sm"
              >
                <div className="min-w-0">
                  <p className="font-bold">
                    {staffUser.name}
                    {staffUser.role === "admin" && (
                      <ShieldCheck className="ms-1.5 inline h-4 w-4 text-primary" aria-hidden />
                    )}
                    {isSelf && (
                      <span className="ms-2 text-xs font-normal text-muted-foreground">{t("staff.you")}</span>
                    )}
                  </p>
                  <p dir="ltr" className={`text-sm text-muted-foreground ${isArabic ? "text-end" : ""}`}>
                    {staffUser.email}
                  </p>
                  <p className="text-xs text-muted-foreground">{roleLabel(staffUser.role)}</p>
                  {!staffUser.isActive && (
                    <span className="text-xs font-medium text-destructive">{t("staff.disabled")}</span>
                  )}
                </div>

                {/* Disabling your own account would lock you out of the dashboard
                    with no way back in, so it isn't offered. */}
                {!isSelf && (
                  <button
                    type="button"
                    onClick={() => updateUser.mutate({ id: staffUser.id, isActive: !staffUser.isActive })}
                    disabled={updateUser.isPending}
                    className="h-10 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60"
                  >
                    {staffUser.isActive ? t("staff.disable") : t("staff.enable")}
                  </button>
                )}

                <div className="w-full border-t border-border pt-3">
                  {/* wa.me cannot deliver on its own, so this decides who shows
                      up as a one-tap forward on each order, not who gets an
                      automatic message. */}
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    {t("staff.notificationsTitle")}
                  </p>
                  <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
                    <input
                      type="tel"
                      dir="ltr"
                      defaultValue={staffUser.whatsappNumber ?? ""}
                      placeholder="+968XXXXXXXX"
                      onBlur={(event) => {
                        const next = event.target.value.trim();
                        if (next === (staffUser.whatsappNumber ?? "")) return;
                        updateUser.mutate({ id: staffUser.id, whatsappNumber: next });
                      }}
                      className="h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
                    />
                    <label
                      title={!staffUser.whatsappNumber ? t("staff.needsNumberHint") : undefined}
                      className={`flex items-center gap-2 rounded-lg border border-border px-3 text-sm ${
                        staffUser.whatsappNumber ? "cursor-pointer hover:bg-muted" : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={staffUser.receivesOrderNotifications}
                        // Without a number there is nowhere to send, so the
                        // toggle would promise something it cannot do.
                        disabled={!staffUser.whatsappNumber || updateUser.isPending}
                        onChange={(event) =>
                          updateUser.mutate({
                            id: staffUser.id,
                            receivesOrderNotifications: event.target.checked
                          })
                        }
                        className="accent-[hsl(var(--secondary))]"
                      />
                      {t("staff.receivesOrders")}
                    </label>
                  </div>

                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    {t("staff.permissionsTitle")}
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {permissions.map((permission) => {
                      const fromRole = staffUser.rolePermissions.includes(permission.key);
                      const granted = staffUser.permissions.includes(permission.key);

                      return (
                        <label
                          key={permission.key}
                          title={fromRole ? t("staff.fromRoleHint") : (permission.description ?? undefined)}
                          className={`flex items-start gap-2 rounded-lg border border-border p-2 text-sm ${
                            fromRole ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-muted"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={granted}
                            // A permission the role already grants cannot be
                            // taken away here — unticking it would appear to
                            // work and change nothing.
                            disabled={fromRole || updateUser.isPending}
                            onChange={(event) =>
                              updateUser.mutate({
                                id: staffUser.id,
                                extraPermissions: event.target.checked
                                  ? [...staffUser.extraPermissions, permission.key]
                                  : staffUser.extraPermissions.filter((key) => key !== permission.key)
                              })
                            }
                            className="mt-0.5 accent-[hsl(var(--secondary))]"
                          />
                          <span>
                            {t(`permissions.${permission.key}`, { defaultValue: permission.key })}
                            {fromRole && (
                              <span className="ms-1 text-xs text-muted-foreground">
                                {t("staff.fromRole")}
                              </span>
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {updateUser.isError && (
          <p className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {getErrorMessage(updateUser.error, t("common.saveFailed"))}
          </p>
        )}
      </div>
    </div>
  );
}
