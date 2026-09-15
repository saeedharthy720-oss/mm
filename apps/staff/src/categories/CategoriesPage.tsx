import { ChevronDown, ChevronUp, Eye, EyeOff, FolderTree, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useReorderCategories,
  useUpdateCategory,
  type Category
} from "./useCategories.js";

const fieldClass =
  "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2";

function CategoryForm({
  initial,
  categories,
  onSubmit,
  onCancel
}: {
  initial?: Category;
  categories: Category[];
  onSubmit: (values: { nameEn: string; nameAr: string; parentId: string | null }) => void;
  onCancel?: () => void;
}) {
  const { t } = useTranslation();
  const [nameEn, setNameEn] = useState(initial?.nameEn ?? "");
  const [nameAr, setNameAr] = useState(initial?.nameAr ?? "");
  const [parentId, setParentId] = useState(initial?.parentId ?? "");

  return (
    <form
      className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ nameEn, nameAr, parentId: parentId || null });
        if (!initial) {
          setNameEn("");
          setNameAr("");
          setParentId("");
        }
      }}
    >
      <label className="text-xs text-muted-foreground">
        {t("categories.nameEn")}
        <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} required className={fieldClass} />
      </label>
      <label className="text-xs text-muted-foreground">
        {t("categories.nameAr")}
        <input
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          required
          dir="rtl"
          className={fieldClass}
        />
      </label>
      <label className="text-xs text-muted-foreground">
        {t("categories.parent")}
        <select value={parentId} onChange={(e) => setParentId(e.target.value)} className={fieldClass}>
          <option value="">{t("categories.noParent")}</option>
          {categories
            .filter((category) => category.id !== initial?.id)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameEn}
              </option>
            ))}
        </select>
      </label>

      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="flex h-10 items-center gap-1.5 rounded-lg bg-secondary px-4 text-sm font-bold text-secondary-foreground shadow-sm"
        >
          {initial ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {t("common.save")}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t("common.cancel")}</span>
          </button>
        )}
      </div>
    </form>
  );
}

export function CategoriesPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data: categories = [] } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const reorderCategories = useReorderCategories();
  const [editingId, setEditingId] = useState<string | null>(null);

  const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  function move(category: Category, direction: -1 | 1) {
    const siblings = sorted.filter((c) => c.parentId === category.parentId);
    const index = siblings.findIndex((c) => c.id === category.id);
    const swapWith = siblings[index + direction];
    if (!swapWith) return;
    reorderCategories.mutate([
      { id: category.id, sortOrder: swapWith.sortOrder },
      { id: swapWith.id, sortOrder: category.sortOrder }
    ]);
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">{t("categories.title")}</h1>

      <div className="rounded-xl border border-card-border bg-card p-5 shadow-sm">
        <h2 className="mb-3 font-bold">{t("categories.addNew")}</h2>
        <CategoryForm categories={categories} onSubmit={(values) => createCategory.mutate(values)} />
      </div>

      {sorted.length > 0 ? (
        <div className="space-y-2">
          {sorted.map((category) => (
            <div key={category.id} className="rounded-xl border border-card-border bg-card p-4 shadow-sm">
              {editingId === category.id ? (
                <CategoryForm
                  initial={category}
                  categories={categories}
                  onSubmit={(values) => {
                    updateCategory.mutate({ id: category.id, ...values });
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div style={{ paddingInlineStart: category.parentId ? "1.5rem" : 0 }}>
                    <p className="font-bold">
                      {isArabic ? category.nameAr : category.nameEn}
                      <span className="ms-2 text-sm font-normal text-muted-foreground">
                        {isArabic ? category.nameEn : category.nameAr}
                      </span>
                    </p>
                    {!category.isActive && (
                      <span className="text-xs text-destructive">{t("categories.hidden")}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(category, -1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(category, 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title={category.isActive ? t("categories.hide") : t("categories.show")}
                      onClick={() => updateCategory.mutate({ id: category.id, isActive: !category.isActive })}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                    >
                      {category.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      title={t("common.edit")}
                      onClick={() => setEditingId(category.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title={t("common.delete")}
                      onClick={() => {
                        if (window.confirm(t("categories.confirmDelete"))) deleteCategory.mutate(category.id);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <FolderTree className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-medium">{t("categories.empty")}</p>
        </div>
      )}
    </div>
  );
}
