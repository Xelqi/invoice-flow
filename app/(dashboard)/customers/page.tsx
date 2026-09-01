import { prisma } from "@/lib/prisma";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <p className="mt-2 text-slate-400">
          Manage your customer relationships.
        </p>
      </div>

      <div className="space-y-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-white">{customer.name}</h2>
                <p className="text-sm text-slate-400">{customer.email}</p>
                <p className="text-sm text-slate-500">{customer.company}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  customer.status === "Active"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {customer.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
