
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name must be 100 characters or less." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must be 1000 characters or less." }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
