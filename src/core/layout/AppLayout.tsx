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
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-6xl flex-1">
        <TopNav mode={mode} onModeChange={onModeChange} />
        <main className="px-6 pb-10">{children}</main>
      </div>
      <footer className="border-t border-neutral-800/50 py-4 text-center text-sm text-neutral-500">
        Made with ❤️ by <span className="text-neutral-300">Kushagra Gupta</span>
      </footer>
    </div>
  );
}
