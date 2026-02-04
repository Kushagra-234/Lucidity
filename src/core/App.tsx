import { useState } from "react";
import { AppLayout } from "./layout/AppLayout";
import { InventoryPage } from "../features/inventory/InventoryPage";
import type { ViewMode } from "../shared/types/viewMode";

export default function App() {
  const [mode, setMode] = useState<ViewMode>("admin");

  return (
    <AppLayout mode={mode} onModeChange={setMode}>
      <InventoryPage />
    </AppLayout>
  );
}
