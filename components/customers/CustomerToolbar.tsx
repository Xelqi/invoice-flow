"use client";

import { Search, Plus } from "lucide-react";

type CustomerToolbarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function CustomerToolbar({
  search,
  setSearch,
}: CustomerToolbarProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search customers..."
          className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-sm text-white outline-none transition focus:border-violet-500"
        />
      </div>

      <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500">
        <Plus className="h-4 w-4" />
        New Customer
      </button>
    </div>
  );
}
