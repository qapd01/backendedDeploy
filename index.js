const app = require('./api/index.js');
const admin = require("firebase-admin")


const config = require('./config.js');


const { default: mongoose } = require('mongoose');


const start = async () => {
  // DO NOT COMMIT/PUSH USERNAME AND PASSWORD TO Github
  await mongoose.connect(
    config.mongodb.uri, {
    user: config.mongodb.username,
    pass: config.mongodb.password,
    retryWrites: true

  }
  );
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });

  const serviceAccount = JSON.parse(
    process.env.GOOGLE_APPLICATION_CREDENTIALS
  );



  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

  })
};

start();