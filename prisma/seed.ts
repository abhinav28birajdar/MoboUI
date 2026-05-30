// prisma/seed.ts
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const COMPONENTS_DATA = require("./components.json");

async function main() {
  console.log("Seeding components...");

  for (const comp of COMPONENTS_DATA) {
    await prisma.component.upsert({
      where: { slug: comp.slug },
      update: {},
      create: {
        name: comp.name,
        slug: comp.slug,
        category: comp.category,
        framework: comp.frameworks?.join(',') || 'both',
        description: comp.description || '',
        tags: comp.tags || [],
        flutterCode: `// Flutter ${comp.name} code...`,
        reactNativeCode: `// RN ${comp.name} code...`,
        expoCode: `// Expo ${comp.name} code...`,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
