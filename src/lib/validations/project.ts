import { z } from "zod";

export const projectSubmitSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(60, "Title must be less than 60 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(160, "Keep description under 160 characters."),
  long_description: z.string().min(50, "Please provide more details in the long description."),
  framework: z.enum(['flutter', 'react_native', 'expo', 'web'], {
    message: "Please select a framework.",
  }),
  tags: z.array(z.string()).min(1, "Add at least one tag.").max(5, "Maximum 5 tags allowed."),
  project_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  github_url: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  cover_image_url: z.string().url("Must be a valid image URL.").optional(),
});

export type ProjectSubmitInput = z.infer<typeof projectSubmitSchema>;
