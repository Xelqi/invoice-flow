import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          SaaS Billing Platform
        </p>

        <h1 className="mb-6 text-6xl font-bold tracking-tight">
          InvoiceFlow
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-300">
          Modern customer, invoice and payment management built with Next.js,
          TypeScript and PostgreSQL.
        </p>

        <Link href="/dashboard" className="rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500">
          Open Dashboard
        </Link>
      </section>
    </main>
  );
}