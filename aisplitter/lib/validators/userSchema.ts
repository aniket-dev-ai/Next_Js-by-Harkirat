import { z } from "zod";

export const userSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  imageUrl: z.string().url().optional(),
  createdAt: z.date(),
});

export type UserType = z.infer<typeof userSchema>;
