import { z } from 'zod';

export const ProjectSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().optional(),
});

export const UserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
});
