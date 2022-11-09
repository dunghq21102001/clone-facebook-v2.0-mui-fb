// import firebase from 'firebase'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdh31N6kyUqb5ZBphUCJ_no29qWmkFOLU",
  authDomain: "facebook-clone-v2-366613.firebaseapp.com",
  projectId: "facebook-clone-v2-366613",
  storageBucket: "facebook-clone-v2-366613.appspot.com",
  messagingSenderId: "860104893875",
  appId: "1:860104893875:web:be940a7905892b7c3817c6",
  measurementId: "G-VWNFTR0WPH"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({ prompt: 'select_account' })