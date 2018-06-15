// Initialize Firebase
import firebase from "firebase";
import { config } from "config/keys";

try {
  var firebaseApp = firebase.initializeApp(config);
} catch (err) {
  console.error("Error initializing firebase", err.code + " - " + err.message);
}

let auth = firebase.auth();
let user = auth.user;

export function login() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      console.log("user", user);
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

export function logout() {
  auth
    .signOut()
    .then(() => {
      return (user = null);
    })
    .catch(() => {
      console.log("Error logging out");
    });
}

firebase.auth().onAuthStateChanged(function(loggedInUser) {
  if (loggedInUser) {
    user = loggedInUser;
  } else {
    user = null;
  }
});

export function checkAuthuser() {
  console.log("User at staert", auth.currentUser);
  return auth.currentUser;
}

export { auth, user };
