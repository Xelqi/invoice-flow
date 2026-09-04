import { prisma } from "@/lib/prisma";
import CustomerTable from "@/components/customers/CustomerTable";
import AddCustomerModal from "@/components/customers/AddCustomerModal";

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
      <AddCustomerModal />
      <CustomerTable customers={customers} />
    </>
  );
}
