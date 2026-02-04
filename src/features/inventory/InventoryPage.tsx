import { useEffect, useState } from "react";
import { fetchInventory } from "../../shared/api/inventory";
import type { InventoryItem } from "../../shared/types/inventory";
import type { ViewMode } from "../../shared/types/viewMode";
import { ProductTable } from "./components/ProductTable";
import { StatsGrid } from "./components/StatsGrid";

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "success"; data: InventoryItem[] }
  | { status: "error"; message: string };

type Props = {
  mode: ViewMode;
};

export function InventoryPage({ mode }: Props) {
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setState({ status: "loading" });
      try {
        const data = await fetchInventory();
        if (cancelled) return;
        setState({ status: "success", data });
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
  const data = state.status === "success" ? state.data : [];

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
          <StatsGrid items={data} />
          <ProductTable items={data} mode={mode} />
        </>
      )}
    </section>
  );
}
