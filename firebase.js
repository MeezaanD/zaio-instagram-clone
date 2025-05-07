// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// const app = initializeApp(window.firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);


// Initialize Firebase with window.firebaseConfig
firebase.initializeApp(window.firebaseConfig);

// Optional: Initialize services
const auth = firebase.auth();
const db = firebase.firestore();
