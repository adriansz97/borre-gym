import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDH7FeTV2xmUrkqpgz0rruDbrgPkILkHNo",
    authDomain: "borre-gym.firebaseapp.com",
    databaseURL: "https://borre-gym.firebaseio.com",
    projectId: "borre-gym",
    storageBucket: "borre-gym.appspot.com",
    messagingSenderId: "213713256109",
    appId: "1:213713256109:web:c5ac97d17661af959e9024"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firebase2 = firebase.initializeApp(firebaseConfig, "Secondary");

const db = firebase.firestore()
const auth = firebase.auth()
const auth2 = firebase2.auth()

export {db,auth,auth2}