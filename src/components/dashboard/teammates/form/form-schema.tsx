import { z } from 'zod';

const TeammatesFormSchema = z.object({
  name: z.string().min(2, 'Teammate name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  teams: z.array(z.string()),
  avatar: z.string().nullable(),
  color: z.string().min(4, 'Color must be a valid hex code'),
});

export { TeammatesFormSchema };
