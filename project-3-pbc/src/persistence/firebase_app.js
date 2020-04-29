import * as firebase from "firebase/app"; 

var firebaseConfig = {
  apiKey: "AIzaSyBXV3f5bjjGU1Z4qb-i0ghmOfL3TyIGCkg",
  authDomain: "tempproj-9cf6d.firebaseapp.com",
  databaseURL: "https://tempproj-9cf6d.firebaseio.com",
  projectId: "tempproj-9cf6d",
  storageBucket: "tempproj-9cf6d.appspot.com",
  messagingSenderId: "201541115664",
  appId: "1:201541115664:web:ca4b34868c3932d323cf95",
  measurementId: "G-69W0HK6JY0"
  };

  export var firebaseApp = firebase.initializeApp(firebaseConfig); 