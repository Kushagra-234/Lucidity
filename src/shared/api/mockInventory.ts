import type { InventoryItem } from "../types/inventory";

export const MOCK_INVENTORY: InventoryItem[] = [
  { name: "Bluetooth headset", category: "Electronic", price: 5, quantity: 5 },
  { name: "Edifier M34560", category: "Electronic", price: 5, quantity: 0 },
  {
    name: "Sony 4K 55 inch ultra TV",
    category: "Electronic",
    price: 50,
    quantity: 17,
  },
  {
    name: "Samsung 55 inch tv",
    category: "Electronic",
    price: 500,
    quantity: 50,
  },
  { name: "samsung s24 ultra", category: "phone", price: 50, quantity: 0 },
  { name: "iPhone 15 Pro", category: "phone", price: 120, quantity: 12 },
  { name: "Lenovo ThinkPad", category: "Laptop", price: 200, quantity: 4 },
  { name: "Logitech Mouse", category: "Accessories", price: 10, quantity: 30 },
  {
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 25,
    quantity: 14,
  },
];
