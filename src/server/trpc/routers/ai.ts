import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../index";

export const aiRouter = createTRPCRouter({
    convertCode: protectedProcedure
        .input(
            z.object({
                sourceCode: z.string(),
                sourceFramework: z.string(),
                targetFramework: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            // This will be integrated with LLM later
            return {
                convertedCode: `// Converted to ${input.targetFramework} from ${input.sourceFramework}\n// Placeholder for AI conversion result\n\n${input.sourceCode}`,
                status: "placeholder",
            };
        }),
});
