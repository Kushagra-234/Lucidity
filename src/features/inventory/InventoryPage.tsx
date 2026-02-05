import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/hooks";
import { ProductTable } from "./components/ProductTable";
import { StatsGrid } from "./components/StatsGrid";
import { EditProductModal } from "./components/EditProductModal";
import {
  deleteProduct,
  toggleDisableProduct,
  loadInventory,
  updateProduct,
} from "../../core/slices/inventory/inventorySlice";

export function InventoryPage() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.ui.mode);
  const { status, error, products } = useAppSelector((s) => s.inventory);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(loadInventory());
    }
  }, [dispatch, status]);

  const isLoading = status === "idle" || status === "loading";
  const isError = status === "error";
  const activeProducts = products.filter((p) => !p.disabled);
  const editingProduct = editingId
    ? (products.find((p) => p.id === editingId) ?? null)
    : null;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-200">
          Inventory stats
        </h1>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6">
          <div className="text-sm text-neutral-400">Loading inventory…</div>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6">
          <div className="text-sm text-red-300">
            {error ?? "Failed to load inventory"}
          </div>
        </div>
      ) : (
        <>
          <StatsGrid items={activeProducts} />
          <ProductTable
            items={products}
            mode={mode}
            onEdit={(id) => {
              if (mode !== "admin") return;
              setEditingId(id);
            }}
            onDisable={(id) => {
              if (mode !== "admin") return;
              dispatch(toggleDisableProduct(id));
            }}
            onDelete={(id) => {
              if (mode !== "admin") return;
              dispatch(deleteProduct(id));
            }}
          />
          <EditProductModal
            open={mode === "admin" && editingId !== null}
            product={editingProduct}
            onClose={() => setEditingId(null)}
            onSave={(next) => {
              if (mode !== "admin") return;
              dispatch(updateProduct(next));
              setEditingId(null);
            }}
          />
        </>
      )}
    </section>
  );
}
