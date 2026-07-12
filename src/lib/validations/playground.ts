import { z } from "zod";

export const playgroundSaveSchema = z.object({
  code_flutter: z.string().optional(),
  code_react_native: z.string().optional(),
  code_expo: z.string().optional(),
  code_web: z.string().optional(),
  active_framework: z.enum(['flutter', 'react_native', 'expo', 'web']),
  device_type: z.string(),
  device_skin: z.string(),
  theme: z.string(),
});

export type PlaygroundSaveInput = z.infer<typeof playgroundSaveSchema>;

export const playgroundShareSchema = playgroundSaveSchema;

export type PlaygroundShareInput = z.infer<typeof playgroundShareSchema>;
