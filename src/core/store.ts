import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui/uiSlice";
import inventoryReducer from "./slices/inventory/inventorySlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    inventory: inventoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
