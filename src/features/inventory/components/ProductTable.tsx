import type { ViewMode } from "../../../shared/types/viewMode";
import type React from "react";
import type { InventoryProduct } from "../types";

type Props = {
  items: InventoryProduct[];
  mode: ViewMode;
  onEdit: (id: string) => void;
  onDisable: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatMoney(value: number) {
  return `$${new Intl.NumberFormat("en-IN").format(value)}`;
}

export function ProductTable({
  items,
  mode,
  onEdit,
  onDisable,
  onDelete,
}: Props) {
  const isUser = mode === "user";

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/30">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[720px] w-full border-collapse text-left text-sm">
          <thead className="bg-neutral-900/60">
            <tr className="text-xs uppercase tracking-wide text-lime-300/80">
              <Th>Name</Th>
              <Th className="hidden md:table-cell">Category</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th className="hidden text-right md:table-cell">Value</Th>
              <Th className="text-center">Action</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const value = item.price * item.quantity;
              const isDisabled = item.disabled;
              const disableActions = isUser || isDisabled;
              return (
                <tr key={item.id} className="border-t border-neutral-800/70">
                  <Td>
                    <div className="space-y-1">
                      <div className="font-medium text-neutral-200">
                        {item.name}
                      </div>
                      <div className="md:hidden">
                        <span className="rounded-full bg-neutral-800/60 px-3 py-1 text-xs text-neutral-200">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </Td>
                  <Td className="hidden md:table-cell">
                    <span className="rounded-full bg-neutral-800/60 px-3 py-1 text-xs text-neutral-200">
                      {item.category}
                    </span>
                  </Td>
                  <Td>{formatMoney(item.price)}</Td>
                  <Td>{item.quantity}</Td>
                  <Td className="hidden text-right text-neutral-200 md:table-cell">
                    {formatMoney(value)}
                  </Td>
                  <Td>
                    <div className="flex flex-nowrap items-center justify-center gap-4 whitespace-nowrap">
                      <ActionIconButton
                        label="Edit"
                        disabled={disableActions}
                        onClick={() => onEdit(item.id)}
                      >
                        <PencilIcon />
                      </ActionIconButton>
                      <ActionIconButton
                        label={isDisabled ? "Enable" : "Disable"}
                        disabled={isUser}
                        onClick={() => onDisable(item.id)}
                      >
                        {isDisabled ? <EyeOffIcon /> : <EyeIcon />}
                      </ActionIconButton>
                      <ActionIconButton
                        label="Delete"
                        disabled={disableActions}
                        onClick={() => onDelete(item.id)}
                      >
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
    </div>
  );
}

type ThProps = React.ThHTMLAttributes<HTMLTableCellElement>;
function Th({ className = "", ...props }: ThProps) {
  return <th className={`px-3 py-3 sm:px-5 ${className}`} {...props} />;
}

type TdProps = React.TdHTMLAttributes<HTMLTableCellElement>;
function Td({ className = "", ...props }: TdProps) {
  return (
    <td
      className={`px-3 py-4 text-neutral-300 sm:px-5 ${className}`}
      {...props}
    />
  );
}

type ActionIconButtonProps = {
  label: string;
  disabled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

function ActionIconButton({
  label,
  disabled,
  onClick,
  children,
}: ActionIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={
        "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors " +
        (disabled
          ? "cursor-default bg-neutral-800/30 text-neutral-500"
          : "cursor-pointer bg-neutral-800/50 text-neutral-200 hover:bg-neutral-800 hover:text-neutral-100")
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
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m1 1 22 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.12 14.12a3 3 0 1 1-4.24-4.24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
