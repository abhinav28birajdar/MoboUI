import { z } from "zod";

export const componentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Keep description under 200 characters."),
  long_description: z.string().optional(),
  category_id: z.string().uuid("Please select a valid category."),
  framework: z.enum(['flutter', 'react_native', 'expo', 'web'], {
    message: "Please select a framework.",
  }),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed.").default([]),
  is_pro: z.boolean().default(false),
});

export type ComponentInput = z.infer<typeof componentSchema>;

export const variantSchema = z.object({
  name: z.string().min(2, "Variant name must be at least 2 characters."),
  description: z.string().optional(),
  code_flutter: z.string().optional(),
  code_react_native: z.string().optional(),
  code_expo: z.string().optional(),
  code_web: z.string().optional(),
  sort_order: z.number().int().default(0),
});

export type VariantInput = z.infer<typeof variantSchema>;
