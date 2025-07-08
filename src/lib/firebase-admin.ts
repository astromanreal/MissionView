
import admin from 'firebase-admin';

let adminAuth: admin.auth.Auth | null = null;
let adminDb: admin.firestore.Firestore | null = null;

// This is the service account key file you download from Firebase
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
};

// Only attempt to initialize if all credentials are provided
if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: serviceAccount.projectId,
          clientEmail: serviceAccount.clientEmail,
          // The private key must be formatted correctly.
          // When using environment variables, you might need to replace `\\n` with actual newlines.
          privateKey: serviceAccount.privateKey.replace(/\\n/g, '\n'),
        }),
      });
      adminAuth = admin.auth();
      adminDb = admin.firestore();
    } catch (error: any) {
        console.error("Firebase Admin SDK initialization error:", error.message);
        // Don't rethrow, just log. The services will remain null.
    }
  } else {
    // If the app is already initialized, get the services
    adminAuth = admin.auth();
    adminDb = admin.firestore();
  }
} else {
    // This warning is useful for local development to know why admin features aren't working.
    if (process.env.NODE_ENV === 'development') {
        console.warn(
          'Firebase Admin SDK not initialized. Missing one or more required environment variables: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY.'
        );
    }
}

export { adminAuth, adminDb };
