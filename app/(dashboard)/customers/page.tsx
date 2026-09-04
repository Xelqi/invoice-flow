import { prisma } from "@/lib/prisma";
import CustomerTable from "@/components/customers/CustomerTable";
import AddCustomerModal from "@/components/customers/AddCustomerModal";
import { revalidatePath } from "next/cache";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  async function createCustomer(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;

    await prisma.customer.create({
      data: {
        name,
        email,
        company,
      },
    });
    revalidatePath("/customers");
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <p className="mt-2 text-slate-400">
          Manage your customer relationships.
        </p>
      </div>
      <AddCustomerModal createCustomer={createCustomer} />
      <CustomerTable customers={customers} />
    </>
  );
}
