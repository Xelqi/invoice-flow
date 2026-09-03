type StatusBadgeProps = {
  status: "Active" | "Inactive";
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === "Active";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-slate-700 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
}
