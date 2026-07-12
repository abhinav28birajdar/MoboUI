import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters.").optional().or(z.literal("")),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username must be less than 30 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  bio: z.string().max(160, "Bio must be 160 characters or less.").optional().or(z.literal("")),
  website: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
  github_username: z.string().regex(/^[a-zA-Z0-9_-]*$/, "Invalid GitHub username").optional().or(z.literal("")),
  twitter_username: z.string().regex(/^[a-zA-Z0-9_]*$/, "Invalid Twitter username").optional().or(z.literal("")),
  avatar_url: z.string().url().optional().or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;
