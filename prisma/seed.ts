import { PrismaClient } from "@prisma/client";
import { dataProducts } from "./data/products";
import { dataCategories } from "./data/categories";

const prisma = new PrismaClient();

async function main() {
  for (const category of dataCategories) {
    const resultCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });

    console.log(`⚙️ Category: ${resultCategory.name}`);
  }

  for (const product of dataProducts) {
    const { categorySlug, ...productData } = product;

    const resultProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...productData, category: { connect: { slug: categorySlug } } },
      create: {...productData, category: { connect: { slug: categorySlug } } },
    });

    console.log(`⚙️ Product: ${product.name}`);
  }
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
