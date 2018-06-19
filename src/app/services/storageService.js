// Initialize Firebase
import firebase from "firebase";
import { config } from "config/keys";
import { resolve } from "path";
var firebaseApp;
try {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(config);
    console.log("initializing...");
  } else {
    firebaseApp = firebase.app();
    console.log("I have firebase app");
  }
} catch (err) {
  console.error("Error initializing firebase", err.code + " - " + err.message);
}

const storage = firebaseApp.storage().ref();

export function uploadFile(path, file) {
  let imagesRef = storage.child("images/" + path);
  let uploadTask = imagesRef.put(file);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function(error) {
      console.log("Error occured", error);
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object

          break;

        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(function(downloadURL) {
          console.log("File available at", downloadURL);
        })
        .catch(e => console.log("error getting download url", e));
    }
  );

  return uploadTask;
}
