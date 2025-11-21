// auth-state.js
import { auth } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Check authentication state and redirect accordingly
export function initAuthState() {
  onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (user) {
      // User is signed in
      console.log('User is signed in:', user.email);
      localStorage.setItem('currentUser', JSON.stringify({
        uid: user.uid,
        email: user.email
      }));
      
      // If on login/signup page, redirect to feed
      if (currentPage === 'login.html' || currentPage === 'signup.html' || currentPage === 'index.html') {
        window.location.href = 'feed.html';
      }
    } else {
      // User is signed out
      console.log('User is signed out');
      localStorage.removeItem('currentUser');
      
      // If not on login page, redirect to login
      if (currentPage !== 'login.html' && currentPage !== 'signup.html') {
        window.location.href = 'login.html';
      }
    }
  });
}
