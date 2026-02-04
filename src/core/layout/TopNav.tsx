import type { ViewMode } from "../../shared/types/viewMode";

type Props = {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
};

export function TopNav({ mode, onModeChange }: Props) {
  const isAdmin = mode === "admin";

  return (
    <header className="flex items-center justify-end gap-4 px-6 py-4">
      <div className="flex items-center gap-2 text-sm text-neutral-300">
        <span className={isAdmin ? "text-neutral-100" : ""}>admin</span>
        <button
          type="button"
          onClick={() => onModeChange(isAdmin ? "user" : "admin")}
          className={
            "relative h-5 w-9 rounded-full transition-colors " +
            (isAdmin ? "bg-lime-500/80" : "bg-neutral-600")
          }
          aria-label="Toggle view mode"
        >
          <span
            className={
              "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform " +
              (isAdmin ? "translate-x-4" : "translate-x-0.5")
            }
          />
        </button>
        <span className={!isAdmin ? "text-neutral-100" : ""}>user</span>
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
