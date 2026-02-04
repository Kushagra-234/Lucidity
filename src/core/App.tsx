import { AppLayout } from "./layout/AppLayout";
import { InventoryPage } from "../features/inventory/InventoryPage";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setMode } from "../features/ui/uiSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.ui.mode);

  return (
    <AppLayout mode={mode} onModeChange={(next) => dispatch(setMode(next))}>
      <InventoryPage />
    </AppLayout>
  );
}
