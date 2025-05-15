import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2, 'Teammate name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  teams: z.array(z.string()),
  avatar: z.string().nullable(),
  color: z.string().min(4, 'Color must be a valid hex code'),
});
