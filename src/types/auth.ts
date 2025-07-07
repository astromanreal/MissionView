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

// This is the full user object, including sensitive data.
// Should only be used on the server.
export interface User {
  id: string;
  username: string;
  email: string;
  userType: 'user' | 'scientist' | 'admin';
  passwordHash: string; // Store hash, not plain password
}

// This is the user object that will be stored in the context and localStorage
// It shouldn't contain the password hash.
export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  userType: 'user' | 'scientist' | 'admin';
}
