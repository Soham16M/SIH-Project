import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCPWGOyDwsaFzLAOkBM0KZwSHnHGUOlrV0",
  authDomain: "sih-hackathon-2004.firebaseapp.com",
  projectId: "sih-hackathon-2004",
  storageBucket: "sih-hackathon-2004.firebasestorage.app",
  messagingSenderId: "396942971671",
  measurementId: "G-XP6FKDM9NG"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Email + Password login
document.getElementById("loginBtn").addEventListener("click", async () => {
  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    let userRole = role;
    if (snap.exists()) {
      userRole = snap.data().role;
    } else {
      await setDoc(userRef, { email: user.email, role: role });
    }

    window.location.href = `${userRole}-dashboard.html`;
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Google login
document.getElementById("googleBtn").addEventListener("click", async () => {
  const role = document.getElementById("role").value;
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, { email: user.email, role: role });
    }

    window.location.href = `${role}-dashboard.html`;
  } catch (error) {
    alert("Google login failed: " + error.message);
  }
});
