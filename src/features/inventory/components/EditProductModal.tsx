import { useEffect, useMemo, useState } from "react";
import type React from "react";
import type { InventoryProduct } from "../types";

type Props = {
  open: boolean;
  product: InventoryProduct | null;
  onClose: () => void;
  onSave: (next: InventoryProduct) => void;
};

export function EditProductModal({ open, product, onClose, onSave }: Props) {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (!product) return;
    setCategory(product.category);
    setPrice(String(product.price));
    setQuantity(String(product.quantity));
  }, [product]);

  const value = useMemo(() => {
    const p = Number(price);
    const q = Number(quantity);
    const pp = Number.isFinite(p) ? p : 0;
    const qq = Number.isFinite(q) ? q : 0;
    return pp * qq;
  }, [price, quantity]);

  if (!open || !product) return null;

  const parsedPrice = Number(price);
  const priceInvalid = !Number.isFinite(parsedPrice) || parsedPrice <= 0;
  const canSave = category.trim().length > 0 && !priceInvalid;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold text-neutral-100">
              Edit product
            </div>
            <div className="mt-1 text-sm text-neutral-400">{product.name}</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-800/60 text-neutral-200 hover:bg-neutral-800"
            aria-label="Close"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Category">
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 w-full rounded-xl border border-neutral-800 bg-neutral-950/40 px-3 text-sm text-neutral-200 outline-none focus:border-neutral-700"
            />
          </Field>
          <Field label="price">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="decimal"
              className="h-10 w-full rounded-xl border border-neutral-800 bg-neutral-950/40 px-3 text-sm text-neutral-200 outline-none focus:border-neutral-700"
            />
          </Field>
          <Field label="quantity">
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputMode="numeric"
              className="h-10 w-full rounded-xl border border-neutral-800 bg-neutral-950/40 px-3 text-sm text-neutral-200 outline-none focus:border-neutral-700"
            />
          </Field>
          <Field label="value">
            <input
              value={String(value)}
              readOnly
              className="h-10 w-full cursor-not-allowed rounded-xl border border-neutral-800 bg-neutral-950/20 px-3 text-sm text-neutral-400 outline-none"
            />
          </Field>
        </div>

        {priceInvalid && (
          <div className="mt-4 text-sm text-red-400">
            Price must be greater than 0.
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-lime-300/90 hover:text-lime-300"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={() => {
              const p = Number(price);
              const q = Number(quantity);
              onSave({
                ...product,
                category: category.trim(),
                price: Number.isFinite(p) ? p : 0,
                quantity: Number.isFinite(q) ? q : 0,
              });
            }}
            className={
              "h-10 rounded-xl px-4 text-sm font-medium transition-colors " +
              (canSave
                ? "bg-lime-500/80 text-neutral-950 hover:bg-lime-500"
                : "cursor-not-allowed bg-neutral-800/50 text-neutral-500")
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="space-y-2">
      <div className="text-xs font-medium text-neutral-400">{label}</div>
      {children}
    </label>
  );
}
