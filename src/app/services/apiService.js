// Initialize Firebase
import firebase from "firebase";
import { config } from "config/keys";
import { resolve } from "path";
var firebaseApp;
try {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(config);
  } else {
    firebaseApp = firebase.app();
  }
} catch (err) {
  console.error("Error initializing firebase", err.code + " - " + err.message);
}

var db = firebase.firestore(firebaseApp);

export function execApi(type, collection, data) {
  let promise;
  switch (type) {
    case "POST":
      promise = db.collection(collection).add(data);
    case "GET":
      promise = db.collection(collection).get();
  }

  return new Promise((resolve, reject) => {
    promise
      .then(res => {
        console.log("res", res);
        resolve({ err: false, data: res });
      })
      .catch(error => {
        resolve({ err: true, data: error });
      });
  });
}
