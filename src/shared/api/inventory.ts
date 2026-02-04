import type { InventoryItem } from "../types/inventory";
import { MOCK_INVENTORY } from "./mockInventory";

const INVENTORY_URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

function normalizeItem(raw: unknown): InventoryItem | null {
  if (!isRecord(raw)) return null;

  const name = typeof raw.name === "string" ? raw.name : "";
  const category = typeof raw.category === "string" ? raw.category : "";
  const price = toNumber(raw.price);
  const quantity = toNumber(raw.quantity);

  if (!name || !category) return null;

  return { name, category, price, quantity };
}

export async function fetchInventory(): Promise<InventoryItem[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(INVENTORY_URL, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(
        `Inventory request failed: ${res.status} ${res.statusText}`,
      );
    }

    const data: unknown = await res.json();

    const rawItems: unknown[] = Array.isArray(data)
      ? data
      : isRecord(data) && Array.isArray(data.inventory)
        ? (data.inventory as unknown[])
        : [];

    const normalized = rawItems
      .map(normalizeItem)
      .filter((x): x is InventoryItem => x !== null);
    return normalized.length ? normalized : MOCK_INVENTORY;
  } catch {
    return MOCK_INVENTORY;
  } finally {
    clearTimeout(timeoutId);
  }
}
