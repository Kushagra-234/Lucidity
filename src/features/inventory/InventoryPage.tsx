import { useEffect, useState } from "react";
import { fetchInventory } from "../../shared/api/inventory";
import type { InventoryItem } from "../../shared/types/inventory";

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "success"; data: InventoryItem[] }
  | { status: "error"; message: string };

export function InventoryPage() {
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

      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6">
        {isLoading ? (
          <div className="text-sm text-neutral-400">Loading inventory…</div>
        ) : isError ? (
          <div className="text-sm text-red-300">{state.message}</div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-neutral-300">
              Fetched products: {data.length}
            </div>
            <ul className="space-y-2 text-sm text-neutral-400">
              {data.slice(0, 5).map((item) => (
                <li
                  key={`${item.name}-${item.category}`}
                  className="flex justify-between"
                >
                  <span className="truncate">{item.name}</span>
                  <span className="ml-4 shrink-0 text-neutral-500">
                    {item.category} · ${item.price} · qty {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
