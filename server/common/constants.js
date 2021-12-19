import firebaseAdmin from 'firebase-admin';

var serviceAccount = require('../../serviceKey.json');

export const firebaseConfig = {
  credential: firebaseAdmin.credential.cert(serviceAccount),
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
