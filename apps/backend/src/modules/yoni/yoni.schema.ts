import { z } from 'zod';

export const YoniSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});
