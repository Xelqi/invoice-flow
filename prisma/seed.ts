import "dotenv/config";
import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.customer.createMany({
    data: [
      {
        name: "Sarah Johnson",
        email: "sarah@acme.ie",
        company: "Acme Ltd",
      },
      {
        name: "James Murphy",
        email: "james@nova.ie",
        company: "Nova Solutions",
        status: "Inactive",
      },
      {
        name: "Emma Walsh",
        email: "emma@pixel.ie",
        company: "Pixel Studio",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${result.count} customers`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
