import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4ZlelWCrPXxshQ3mGqfSzBT0y3GBTXNs",
  authDomain: "booking-13517.firebaseapp.com",
  projectId: "booking-13517",
  storageBucket: "booking-13517.firebasestorage.app",
  messagingSenderId: "457763447290",
  appId: "1:457763447290:web:9e9d5c136304508bbe4443",
  measurementId: "G-9D483J36Y2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
