import type { InventoryItem } from "../../shared/types/inventory";

export type InventoryProduct = InventoryItem & {
  id: string;
  disabled: boolean;
};
