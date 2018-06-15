import { config } from "config/keys";
// Initialize Firebase
const firebase = require("firebase");

firebase.initializeApp(config, () => {
  console.log("Started firebase");
});
