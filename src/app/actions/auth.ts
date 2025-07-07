'use server';

import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import type { User, LoginFormData, SignupFormData } from '@/types/auth';

const usersFilePath = path.join(process.cwd(), 'src', 'lib', 'users.json');

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    // If the file is empty, JSON.parse will fail. Return empty array.
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  } catch (error: any) {
    // If the file doesn't exist, return an empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export async function signup(data: SignupFormData) {
  const users = await readUsers();

  const existingUser = users.find(user => user.email === data.email);
  if (existingUser) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  // It's crucial to hash passwords, never store them in plain text.
  const passwordHash = await bcrypt.hash(data.password, 10);

  const newUser: User = {
    id: crypto.randomUUID(),
    username: data.username,
    email: data.email,
    userType: data.userType,
    passwordHash: passwordHash,
  };

  users.push(newUser);
  await writeUsers(users);

  // Return the user object without the password hash
  const { passwordHash: _, ...userWithoutPassword } = newUser;
  return { success: true, message: 'Account created successfully!', user: userWithoutPassword };
}


export async function login(data: LoginFormData) {
  const users = await readUsers();

  const user = users.find(u => u.email === data.email);
  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
  if (!isPasswordValid) {
    return { success: false, message: 'Invalid email or password.' };
  }
  
  // Return the user object without the password hash
  const { passwordHash, ...userWithoutPassword } = user;
  return { success: true, message: 'Login successful!', user: userWithoutPassword };
}

export async function deleteAccount(userId: string) {
  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }
  const users = await readUsers();
  const initialUserCount = users.length;

  const updatedUsers = users.filter(user => user.id !== userId);

  if (updatedUsers.length === initialUserCount) {
    return { success: false, message: 'User not found.' };
  }

  await writeUsers(updatedUsers);

  return { success: true, message: 'Account deleted successfully.' };
}
