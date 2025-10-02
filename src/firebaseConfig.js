import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyC2WzKMOJgViXpWgTbTZsN7vFrffsQEcCw",
  authDomain: "typing-speed-project-6f967.firebaseapp.com",
  projectId: "typing-speed-project-6f967",
  storageBucket: "typing-speed-project-6f967.firebasestorage.app",
  messagingSenderId: "712266526656",
  appId: "1:712266526656:web:b2ca4d46eed2821fe82225",
  measurementId: "G-G2Z9H0QS10"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { db, auth };
