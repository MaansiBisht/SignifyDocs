import { initializeApp } from 'firebase/app';
import { getAuth ,onAuthStateChanged , createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAVsXRoaiG8CihVMtCpoYwU7e0IScKonuc",
    authDomain: "fire-app-ffaa9.firebaseapp.com",
    projectId: "fire-app-ffaa9",
    storageBucket: "fire-app-ffaa9.firebasestorage.app",
    messagingSenderId: "1024551938829",
    appId: "1:1024551938829:web:c082a566cda3d2c41c9e44",
    measurementId: "G-EEEX60X7WG"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { auth, firestore ,onAuthStateChanged ,createUserWithEmailAndPassword,signInWithEmailAndPassword};