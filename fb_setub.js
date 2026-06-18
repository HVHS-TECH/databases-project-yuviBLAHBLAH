const firebaseConfig = {
  apiKey: "AIzaSyAqQNSvHNkBM_ZfS-RaiAlN1tzUKDSrqSQ",
  authDomain: "comp-2025-yuvraj-bhatt.firebaseapp.com",
  databaseURL: "https://comp-2025-yuvraj-bhatt-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "comp-2025-yuvraj-bhatt",
  storageBucket: "comp-2025-yuvraj-bhatt.firebasestorage.app",
  messagingSenderId: "207730944142",
  appId: "1:207730944142:web:cb2ebc6a3ed524b3cfc1df",
  measurementId: "G-7G5X53NW4K"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);