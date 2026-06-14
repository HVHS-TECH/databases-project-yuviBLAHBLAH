const firebaseConfig = {
    apiKey: "AIzaSyCuVrwW5A-JUCpfEAyAr1ungi0PvCrKAc0",
    authDomain: "yuvi-12comp.firebaseapp.com",
    databaseURL: "https://yuvi-12comp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "yuvi-12comp",
    storageBucket: "yuvi-12comp.firebasestorage.app",
    messagingSenderId: "1077336288843",
    appId: "1:1077336288843:web:f3b4fce3e689398c7427ce",
    measurementId: "G-HV9JCQEM2P"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);