import { ArrowLeft, ArrowRight, ImagePlus, Trash2, Video } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../categories/useCategories.js";
import {
  useCreateProduct,
  useDeleteProductImage,
  useDeleteProductVideo,
  useProduct,
  useUpdateProduct,
  useUploadProductImage,
  useUploadProductVideo
} from "./useProducts.js";
import { useUnits } from "./useUnits.js";

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none ring-ring focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium";

const emptyForm = {
  sku: "",
  nameEn: "",
  nameAr: "",
  descriptionEn: "",
  descriptionAr: "",
  categoryId: "",
  unitId: "",
  customUnitLabel: "",
  price: "",
  quantityAvailable: "0",
  manualStockOverride: false,
  deliveryCharge: "0",
  isActive: true,
  allowCardPayment: true,
  allowPayOnDelivery: true
};

export function ProductFormPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const isArabic = i18n.language === "ar";
  const BackArrow = isArabic ? ArrowRight : ArrowLeft;

  const { data: categories = [] } = useCategories();
  const { data: units = [] } = useUnits();
  const { data: product } = useProduct(id);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const uploadImage = useUploadProductImage();
  const deleteImage = useDeleteProductImage();
  const uploadVideo = useUploadProductVideo();
  const deleteVideo = useDeleteProductVideo();

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (product) {
      setForm({
        sku: product.sku,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        descriptionEn: product.descriptionEn ?? "",
        descriptionAr: product.descriptionAr ?? "",
        categoryId: product.categoryId,
        unitId: product.unitId,
        customUnitLabel: product.customUnitLabel ?? "",
        price: String(product.price),
        quantityAvailable: String(product.quantityAvailable),
        manualStockOverride: product.manualStockOverride,
        deliveryCharge: String(product.deliveryCharge),
        isActive: product.isActive,
        allowCardPayment: product.allowCardPayment,
        allowPayOnDelivery: product.allowPayOnDelivery
      });
    }
  }, [product]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      quantityAvailable: Number(form.quantityAvailable),
      deliveryCharge: Number(form.deliveryCharge)
    };

    if (isEditing && id) {
      await updateProduct.mutateAsync({ id, ...payload });
    } else {
      const created = await createProduct.mutateAsync(payload);
      navigate(`/products/${created.id}`, { replace: true });
    }
  }

  const selectedUnit = units.find((unit) => unit.id === form.unitId);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <BackArrow className="h-4 w-4" />
        {t("products.title")}
      </Link>

      <h1 className="text-2xl font-bold">{isEditing ? t("products.editTitle") : t("products.addNew")}</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <section className="space-y-4 rounded-xl border border-card-border bg-card p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{t("products.nameEn")}</label>
              <input
                required
                value={form.nameEn}
                onChange={(event) => update("nameEn", event.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("products.nameAr")}</label>
              <input
                required
                dir="rtl"
                value={form.nameAr}
                onChange={(event) => update("nameAr", event.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("products.sku")}</label>
              <input
                required
                value={form.sku}
                onChange={(event) => update("sku", event.target.value)}
                className={`${fieldClass} font-mono`}
              />
            </div>
            <div>
              <label className={labelClass}>{t("products.category")}</label>
              <select
                required
                value={form.categoryId}
                onChange={(event) => update("categoryId", event.target.value)}
                className={fieldClass}
              >
                <option value="" disabled>
                  {t("products.selectCategory")}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {isArabic ? category.nameAr : category.nameEn}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{t("products.unit")}</label>
              <select
                required
                value={form.unitId}
                onChange={(event) => update("unitId", event.target.value)}
                className={fieldClass}
              >
                <option value="" disabled>
                  {t("products.selectUnit")}
                </option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {isArabic ? unit.labelAr : unit.labelEn}
                  </option>
                ))}
              </select>
            </div>
            {selectedUnit?.isCustom && (
              <div>
                <label className={labelClass}>{t("products.customUnitLabel")}</label>
                <input
                  value={form.customUnitLabel}
                  onChange={(event) => update("customUnitLabel", event.target.value)}
                  className={fieldClass}
                />
              </div>
            )}
            <div>
              <label className={labelClass}>{t("products.price")}</label>
              <input
                required
                type="number"
                min="0"
                step="0.001"
                value={form.price}
                onChange={(event) => update("price", event.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("products.deliveryCharge")}</label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={form.deliveryCharge}
                onChange={(event) => update("deliveryCharge", event.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("products.quantity")}</label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.quantityAvailable}
                onChange={(event) => update("quantityAvailable", event.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>{t("products.descriptionEn")}</label>
            <textarea
              rows={3}
              value={form.descriptionEn}
              onChange={(event) => update("descriptionEn", event.target.value)}
              className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
          <div>
            <label className={labelClass}>{t("products.descriptionAr")}</label>
            <textarea
              rows={3}
              dir="rtl"
              value={form.descriptionAr}
              onChange={(event) => update("descriptionAr", event.target.value)}
              className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["isActive", t("products.active")],
                ["manualStockOverride", t("products.manualStockOverride")],
                ["allowCardPayment", t("products.allowCard")],
                ["allowPayOnDelivery", t("products.allowCod")]
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-muted"
              >
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(event) => update(key, event.target.checked)}
                  className="accent-[hsl(var(--secondary))]"
                />
                {label}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-secondary font-bold text-secondary-foreground shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {t("common.save")}
          </button>
        </section>
      </form>

      {isEditing && product && (
        <section className="space-y-4 rounded-xl border border-card-border bg-card p-5 shadow-sm">
          <h2 className="font-bold">{t("products.images")}</h2>

          <div className="flex flex-wrap gap-3">
            {product.images.map((image) => (
              <div key={image.id} className="group relative">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${image.url}`}
                  alt=""
                  className="h-24 w-24 rounded-lg border border-border object-cover"
                />
                <button
                  type="button"
                  onClick={() => deleteImage.mutate({ productId: product.id, imageId: image.id })}
                  className="absolute -end-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm"
                >
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">{t("common.delete")}</span>
                </button>
              </div>
            ))}

            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-muted-foreground transition-colors hover:bg-muted">
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs">{t("products.images")}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) uploadImage.mutate({ productId: product.id, file });
                  event.target.value = "";
                }}
              />
            </label>
          </div>

          <h2 className="pt-2 font-bold">{t("products.video")}</h2>
          {product.videoUrl ? (
            <div className="flex flex-wrap items-center gap-3">
              <video
                src={`${import.meta.env.VITE_API_BASE_URL}${product.videoUrl}`}
                controls
                className="h-32 rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={() => deleteVideo.mutate(product.id)}
                className="flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-sm text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
                {t("common.delete")}
              </button>
            </div>
          ) : (
            <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-muted-foreground transition-colors hover:bg-muted">
              <Video className="h-6 w-6" />
              <span className="text-xs">{t("products.video")}</span>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) uploadVideo.mutate({ productId: product.id, file });
                  event.target.value = "";
                }}
              />
            </label>
          )}
        </section>
      )}
    </div>
  );
}
