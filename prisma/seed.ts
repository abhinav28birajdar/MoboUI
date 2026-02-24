```typescript
// prisma/seed.ts
import { PrismaClient, Framework, ComponentStatus } from "@prisma/client";

const prisma = new PrismaClient();

const COMPONENTS_DATA = require("./components.json");

async function main() {
  console.log("Seeding components...");

  for (const comp of COMPONENTS_DATA) {
    // Map framework strings from JSON to Prisma Framework enum
    const mappedFrameworks = comp.frameworks.map((f: string) => Framework[f as keyof typeof Framework]);

    await prisma.component.upsert({
      where: { slug: comp.slug },
      update: {},
      create: {
        ...comp,
        frameworks: mappedFrameworks, // Use the mapped enum values
        status: ComponentStatus.APPROVED,
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
