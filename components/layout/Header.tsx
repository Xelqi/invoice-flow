export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700">
          Search
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
          M
        </div>
      </div>
    </header>
  );
}
