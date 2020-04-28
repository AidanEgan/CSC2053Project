import * as firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyAnTfB1FNxRPRrBDRUuE0ATZYBGTTlEKnM",
    authDomain: "csc-2053-project-3.firebaseapp.com",
    databaseURL: "https://csc-2053-project-3.firebaseio.com",
    projectId: "csc-2053-project-3",
    storageBucket: "csc-2053-project-3.appspot.com",
    messagingSenderId: "242607999261",
    appId: "1:242607999261:web:d445af3e53c9d97978f9f4",
    measurementId: "G-X3BQ1MMP87"
  };


  export var firebaseApp = firebase.initializeApp(firebaseConfig);
