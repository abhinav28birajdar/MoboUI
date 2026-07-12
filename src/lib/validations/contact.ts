import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(2, "Please provide a subject."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type ContactInput = z.infer<typeof contactSchema>;
