import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, updateEmail, sendEmailVerification } from 'firebase/auth';
import { getDatabase, ref, onValue, off, push } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Add your Firebase project configuration here
const firebaseConfig = {
  apiKey: "AIzaSyByqe4bs0u-GN-2gB0K2eb4lgFTm2z8l7w",
  authDomain: "back2fest-e06f6.firebaseapp.com",
  databaseURL: "https://back2fest-e06f6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "back2fest-e06f6",
  storageBucket: "back2fest-e06f6.appspot.com",
  messagingSenderId: "123251248735",
  appId: "1:123251248735:web:fa1c7a20a2bf15c3c515ea"
};

const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = app;
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export const FIREBASE_AUTH = auth;
export const FIREBASE_STORAGE = storage;

// Export just the necessary functions for use elsewhere
export { auth, database, ref, onValue, off, onAuthStateChanged, push, updateEmail, sendEmailVerification };
