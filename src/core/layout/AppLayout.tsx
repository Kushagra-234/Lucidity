import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import type { ViewMode } from "../../shared/types/viewMode";

type Props = {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  children: ReactNode;
};

export function AppLayout({ mode, onModeChange, children }: Props) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-6xl">
        <TopNav mode={mode} onModeChange={onModeChange} />
        <main className="px-6 pb-10">{children}</main>
      </div>
    </div>
  );
}
