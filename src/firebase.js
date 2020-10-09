import firebase, { firestore } from 'firebase'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCtd6x_xPRBma74ixTCrxOA3G0wQpIwwTs",
    authDomain: "place-e620b.firebaseapp.com",
    databaseURL: "https://place-e620b.firebaseio.com",
    projectId: "place-e620b",
    storageBucket: "place-e620b.appspot.com",
    messagingSenderId: "111041006167",
    appId: "1:111041006167:web:b7df81d0ea6cf84402f112"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const st = firebase.storage();

  export {fb,db}

