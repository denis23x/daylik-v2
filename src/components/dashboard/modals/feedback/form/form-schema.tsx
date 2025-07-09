import { z } from 'zod';

const FeedbackSchema = z.object({
  message: z.string().min(2, 'Message must be at least 2 characters'),
  priority: z.enum(['low', 'medium', 'high']),
});

export { FeedbackSchema };
