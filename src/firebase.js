
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCxAhRYHmxA1HbyKQRAf2cR_EX_0efjL1I",
	authDomain: "testing-27844.firebaseapp.com",
	projectId: "testing-27844",
	storageBucket: "testing-27844.appspot.com",
	messagingSenderId: "10953316529",
	appId: "1:10953316529:web:ebde509fe0e03d3d0e2a90",
  };



// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = app.storage();

export { db, auth, storage };
