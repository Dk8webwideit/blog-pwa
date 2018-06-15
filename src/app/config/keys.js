const isDevelopment = process.env.NODE_ENV === "development";

const configDevelopment = {
  IP_ADDRESS: "192.168.0.104",
  PORT: "3001",
  config: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  },
  API_IP: "192.168.0.104"
};

const configProduction = {
  IP_ADDRESS: "159.65.183.188",
  PORT: "3001",
  API_IP: "159.65.183.188"
};

const config = isDevelopment ? configDevelopment : configProduction;
module.exports = config;
