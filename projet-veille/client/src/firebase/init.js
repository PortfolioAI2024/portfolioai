import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcaGQjO2HjX6qDnCspmGsV5G1tWoP3SKg",
  authDomain: "projet-veille-d01bd.firebaseapp.com",
  projectId: "projet-veille-d01bd",
  storageBucket: "projet-veille-d01bd.appspot.com",
  messagingSenderId: "616326982590",
  appId: "1:616326982590:web:f4145bbc18f31c6060a7ef",
};

const app = initializeApp(firebaseConfig);

if (app) {
  console.log("Firebase a été initialisé avec succès.");
} else {
  console.error("Erreur lors de l'initialisation de Firebase.");
}

const auth = getAuth();
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = firestore;

export { auth, firestore, storage, db };
