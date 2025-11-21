// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNFnHe7dJUmasaW_zXRSzqwqW_BLiegOc",
  authDomain: "hidden-inks.firebaseapp.com",
  projectId: "hidden-inks",
  storageBucket: "hidden-inks.firebasestorage.app",
  messagingSenderId: "169286628545",
  appId: "1:169286628545:web:b2d49198be402698ef1040"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export firebase app instance
export default app;
