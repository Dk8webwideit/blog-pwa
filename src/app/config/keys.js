const isDevelopment = process.env.NODE_ENV === "development";

const configDevelopment = {
  IP_ADDRESS: "192.168.0.104",
  PORT: "3001",
  config: {
    apiKey: "AIzaSyCRZVGE2QCa80Y6Uae3yyNtAnepMmN537g",
    authDomain: "blog-aa450.firebaseapp.com",
    databaseURL: "https://blog-aa450.firebaseio.com",
    projectId: "blog-aa450",
    storageBucket: "blog-aa450.appspot.com",
    messagingSenderId: "282238137883"
  },
  API_IP: "192.168.0.104"
};

const configProduction = {
  IP_ADDRESS: "159.65.183.188",
  PORT: "3001",
  config: {
    apiKey: "AIzaSyCRZVGE2QCa80Y6Uae3yyNtAnepMmN537g",
    authDomain: "blog-aa450.firebaseapp.com",
    databaseURL: "https://blog-aa450.firebaseio.com",
    projectId: "blog-aa450",
    storageBucket: "blog-aa450.appspot.com",
    messagingSenderId: "282238137883"
  },
  API_IP: "159.65.183.188"
};

const config = isDevelopment ? configDevelopment : configProduction;
module.exports = config;
