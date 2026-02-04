import type { InventoryItem } from "../../../shared/types/inventory";
import type { ViewMode } from "../../../shared/types/viewMode";
import type React from "react";

type Props = {
  items: InventoryItem[];
  mode: ViewMode;
};

function formatMoney(value: number) {
  return `$${new Intl.NumberFormat("en-IN").format(value)}`;
}

export function ProductTable({ items, mode }: Props) {
  const isUser = mode === "user";

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/30">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-neutral-900/60">
          <tr className="text-xs uppercase tracking-wide text-lime-300/80">
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th className="text-right">Value</Th>
            <Th className="text-center">Action</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const value = item.price * item.quantity;
            return (
              <tr
                key={`${item.name}-${item.category}`}
                className="border-t border-neutral-800/70"
              >
                <Td>{item.name}</Td>
                <Td>
                  <span className="rounded-full bg-neutral-800/60 px-3 py-1 text-xs text-neutral-200">
                    {item.category}
                  </span>
                </Td>
                <Td>{formatMoney(item.price)}</Td>
                <Td>{item.quantity}</Td>
                <Td className="text-right text-neutral-200">
                  {formatMoney(value)}
                </Td>
                <Td>
                  <div className="flex items-center justify-center gap-3">
                    <ActionIconButton label="Edit" disabled={isUser}>
                      <PencilIcon />
                    </ActionIconButton>
                    <ActionIconButton label="Disable" disabled={isUser}>
                      <EyeIcon />
                    </ActionIconButton>
                    <ActionIconButton label="Delete" disabled={isUser}>
                      <TrashIcon />
                    </ActionIconButton>
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type ThProps = React.ThHTMLAttributes<HTMLTableCellElement>;
function Th({ className = "", ...props }: ThProps) {
  return <th className={`px-5 py-3 ${className}`} {...props} />;
}

type TdProps = React.TdHTMLAttributes<HTMLTableCellElement>;
function Td({ className = "", ...props }: TdProps) {
  return (
    <td className={`px-5 py-4 text-neutral-300 ${className}`} {...props} />
  );
}

type ActionIconButtonProps = {
  label: string;
  disabled: boolean;
  children: React.ReactNode;
};

function ActionIconButton({
  label,
  disabled,
  children,
}: ActionIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={
        "grid h-8 w-8 place-items-center rounded-md transition-colors " +
        (disabled
          ? "cursor-not-allowed bg-neutral-800/30 text-neutral-500"
          : "bg-neutral-800/50 text-neutral-200 hover:bg-neutral-800 hover:text-neutral-100")
      }
    >
      {children}
    </button>
  );
}

function PencilIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14.06 4.19 17.81 7.94"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 6V4h8v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 6l1 16h10l1-16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
