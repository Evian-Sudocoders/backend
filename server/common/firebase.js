import firebaseAdmin from 'firebase-admin';
import { firebaseConfig } from './constants';

const firesbaseApp = firebaseAdmin.initializeApp(firebaseConfig);

const auth = firesbaseApp.auth();
const database = firesbaseApp.firestore();
const storage = firesbaseApp.storage();

export { auth, database, storage };
