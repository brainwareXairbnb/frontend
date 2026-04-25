import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  indexedDBLocalPersistence,
  initializeAuth
} from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if running on native platform
export const isNative = Capacitor.isNativePlatform();

// Initialize Firebase only if not already initialized
let app: FirebaseApp;
let auth: Auth;
let googleProvider: GoogleAuthProvider;

if (typeof window !== 'undefined') {
  // Only initialize on client side
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  // Use different auth initialization for native vs web
  if (isNative) {
    // For native apps (Capacitor), use initializeAuth with indexedDB persistence
    auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence
    });
  } else {
    // For web, use standard getAuth
    auth = getAuth(app);
  }

  googleProvider = new GoogleAuthProvider();

  // Optional: Add scopes if needed
  googleProvider.addScope('profile');
  googleProvider.addScope('email');

  // Optional: Set custom parameters (web only)
  if (!isNative) {
    googleProvider.setCustomParameters({
      prompt: 'select_account', // Forces account selection even if user is logged in
    });
  }
}

export { auth, googleProvider };
