import type { InventoryItem } from "../../../shared/types/inventory";
import type React from "react";

type Props = {
  items: InventoryItem[];
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function StatsGrid({ items }: Props) {
  const totalProducts = items.length;
  const totalStoreValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const outOfStock = items.reduce(
    (sum, item) => sum + (item.quantity === 0 ? 1 : 0),
    0,
  );
  const categories = new Set(items.map((x) => x.category)).size;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total product"
        value={formatNumber(totalProducts)}
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6h15l-1.5 9h-12L6 6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M6 6 5 3H2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
            <path d="M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
          </svg>
        }
      />
      <StatCard
        title="Total store value"
        value={formatNumber(totalStoreValue)}
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2v4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 6h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 10a4 4 0 0 0 8 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 22h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        }
      />
      <StatCard
        title="Out of stocks"
        value={formatNumber(outOfStock)}
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4l16 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 6h10l-1.2 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M7 13l-.5-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        }
      />
      <StatCard
        title="No of Category"
        value={formatNumber(categories)}
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10V4h6v6H4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M14 20v-6h6v6h-6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M4 20v-6h6v6H4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M14 10V4h6v6h-6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-800/70 bg-emerald-950/40 p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-start justify-between">
        <div className="text-sm text-neutral-300">{title}</div>
        <div className="text-neutral-300">{icon}</div>
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-neutral-100">
        {value}
      </div>
    </div>
  );
}
