
'use server';

import { adminDb, adminAuth } from '@/lib/firebase-admin';
import type { CurrentUser } from '@/types/auth';

const adminNotInitializedError = { success: false, message: 'Firebase Admin not initialized. Check server environment variables.' };

/**
 * Creates a user profile document in Firestore after they sign up.
 */
export async function createUserProfile(user: CurrentUser) {
  if (!adminDb) {
    console.error('Error: Firestore Admin is not initialized.');
    return adminNotInitializedError;
  }

  try {
    const { id, ...profileData } = user;
    await adminDb.collection('users').doc(id).set(profileData);
    return { success: true, message: 'User profile created successfully.' };
  } catch (error: any) {
    console.error('Error creating user profile:', error);
    return { success: false, message: error.message || 'Failed to create user profile.' };
  }
}

/**
 * Deletes a user from Firebase Authentication and their profile from Firestore.
 */
export async function deleteUserAccount(userId: string) {
  if (!adminDb || !adminAuth) {
    console.error('Error: Firebase Admin is not initialized.');
    return adminNotInitializedError;
  }

  if (!userId) {
    return { success: false, message: 'User ID is required.' };
  }

  try {
    // Delete from Firestore
    await adminDb.collection('users').doc(userId).delete();
    
    // Delete from Firebase Auth
    await adminAuth.deleteUser(userId);

    return { success: true, message: 'Account deleted successfully.' };
  } catch (error: any) {
    console.error('Error deleting user account:', error);
    // Handle case where user might not exist in auth but exists in db, or vice-versa
    if (error.code === 'auth/user-not-found') {
        return { success: true, message: 'User already deleted.' };
    }
    return { success: false, message: error.message || 'Failed to delete account.' };
  }
}
