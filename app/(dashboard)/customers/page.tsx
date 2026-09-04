import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import CustomersClient from "@/components/customers/CustomersClient";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  type CreateCustomerResult = {
    success: boolean;
    error?: string;
  };

  async function createCustomer(
    formData: FormData,
  ): Promise<CreateCustomerResult> {
    "use server";

    const id = formData.get("id") as string | null;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;

    try {
      if (id) {
        await prisma.customer.update({
          where: { id },
          data: {
            name,
            email,
            company,
          },
        });
      } else {
        await prisma.customer.create({
          data: {
            name,
            email,
            company,
          },
        });
      }

      revalidatePath("/customers");
      return { success: true };
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "P2002") {
        return {
          success: false,
          error: "A customer with this email already exists.",
        };
      }

      return {
        success: false,
        error: "Something went wrong.",
      };
    }
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
      <CustomersClient customers={customers} createCustomer={createCustomer} />
    </>
  );
}
