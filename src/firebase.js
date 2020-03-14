import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyACtcZ1sJsenZoLmmzr9BMU95fv5VZm9tE",
    authDomain: "icdi-89594.firebaseapp.com",
    databaseURL: "https://icdi-89594.firebaseio.com",
    projectId: "icdi-89594",
    storageBucket: "icdi-89594.appspot.com",
    messagingSenderId: "494050738907"
});

const db = firebaseApp.firestore();

export { db };