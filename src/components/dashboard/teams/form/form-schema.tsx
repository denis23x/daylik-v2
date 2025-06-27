import { z } from 'zod';

const TeamsFormSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters'),
  teammates: z.array(z.string()),
  image: z.string().nullable(),
});

export { TeamsFormSchema };
