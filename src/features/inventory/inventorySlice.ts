import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchInventory } from "../../shared/api/inventory";
import type { InventoryProduct } from "./types";
import { createId } from "./utils";

export type InventoryState = {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  products: InventoryProduct[];
};

const initialState: InventoryState = {
  status: "idle",
  error: null,
  products: [],
};

export const loadInventory = createAsyncThunk("inventory/load", async () => {
  const items = await fetchInventory();
  const products: InventoryProduct[] = items.map((item) => ({
    ...item,
    id: createId(),
    disabled: false,
  }));
  return products;
});

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    updateProduct(state, action: { payload: InventoryProduct }) {
      state.products = state.products.map((p) =>
        p.id === action.payload.id ? action.payload : p,
      );
    },
    disableProduct(state, action: { payload: string }) {
      state.products = state.products.map((p) =>
        p.id === action.payload ? { ...p, disabled: true } : p,
      );
    },
    deleteProduct(state, action: { payload: string }) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInventory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadInventory.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(loadInventory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Failed to load inventory";
      });
  },
});

export const { updateProduct, disableProduct, deleteProduct } =
  inventorySlice.actions;
export default inventorySlice.reducer;
