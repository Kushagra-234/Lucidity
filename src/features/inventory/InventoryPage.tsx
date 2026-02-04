import { useEffect, useState } from "react";
import { fetchInventory } from "../../shared/api/inventory";
import type { ViewMode } from "../../shared/types/viewMode";
import type { InventoryItem } from "../../shared/types/inventory";
import { ProductTable } from "./components/ProductTable";
import { StatsGrid } from "./components/StatsGrid";
import type { InventoryProduct } from "./types";
import { createId } from "./utils";
import { EditProductModal } from "./components/EditProductModal";

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

type Props = {
  mode: ViewMode;
};

export function InventoryPage({ mode }: Props) {
  const [state, setState] = useState<LoadState>({ status: "idle" });
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setState({ status: "loading" });
      try {
        const data = await fetchInventory();
        if (cancelled) return;
        const nextProducts = data.map((item: InventoryItem) => ({
          ...item,
          id: createId(),
          disabled: false,
        }));
        setProducts(nextProducts);
        setState({ status: "success" });
      } catch (e) {
        if (cancelled) return;
        const message =
          e instanceof Error ? e.message : "Failed to load inventory";
        setState({ status: "error", message });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const isLoading = state.status === "idle" || state.status === "loading";
  const isError = state.status === "error";
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
          <div className="text-sm text-red-300">{state.message}</div>
        </div>
      ) : (
        <>
          <StatsGrid items={activeProducts} />
          <ProductTable
            items={products}
            mode={mode}
            onEdit={(id) => setEditingId(id)}
            onDisable={(id) => {
              setProducts((prev) =>
                prev.map((p) => (p.id === id ? { ...p, disabled: true } : p)),
              );
            }}
            onDelete={(id) => {
              setProducts((prev) => prev.filter((p) => p.id !== id));
            }}
          />
          <EditProductModal
            open={mode === "admin" && editingId !== null}
            product={editingProduct}
            onClose={() => setEditingId(null)}
            onSave={(next) => {
              setProducts((prev) =>
                prev.map((p) => (p.id === next.id ? next : p)),
              );
              setEditingId(null);
            }}
          />
        </>
      )}
    </section>
  );
}
