import type { ViewMode } from "../../shared/types/viewMode";

type Props = {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
};

export function TopNav({ mode, onModeChange }: Props) {
  const isAdmin = mode === "admin";

  return (
    <header className="flex items-center justify-end gap-4 px-6 py-4">
      <div className="flex items-center gap-4 text-sm text-neutral-300">
        <span
          className={`w-12 shrink-0 text-right ${!isAdmin ? "text-neutral-100" : ""}`}
        >
          user
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isAdmin}
          onClick={() => onModeChange(isAdmin ? "user" : "admin")}
          className={
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300/60 " +
            (isAdmin
              ? "border-lime-400/60 bg-lime-500/70"
              : "border-neutral-700 bg-neutral-700/70")
          }
          aria-label="Toggle view mode"
        >
          <span
            className={
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform " +
              (isAdmin ? "translate-x-5" : "translate-x-1")
            }
          />
        </button>
        <span className={`w-12 shrink-0 ${isAdmin ? "text-neutral-100" : ""}`}>
          admin
        </span>
      </div>

      <button
        type="button"
        className="grid h-9 w-9 place-items-center rounded-lg bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
        aria-label="Logout"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 7V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15 12H3m0 0 3-3m-3 3 3 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </header>
  );
}
