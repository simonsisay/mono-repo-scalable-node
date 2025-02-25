import { z } from "zod";

export const TestingSchema = z.object({
  title: z.string().min(1, "Title is required"),
});
