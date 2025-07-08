import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const signupSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  userType: z.enum(['user', 'scientist', 'admin'], { required_error: "Please select a user type." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;


// This is the user profile object that will be stored in Firestore
// and used throughout the client-side application.
export interface CurrentUser {
  id: string; // This will be the Firebase Auth UID
  username: string;
  email: string;
  userType: 'user' | 'scientist' | 'admin';
}
