import dotenv from 'dotenv';

import app from './app.js';

// const dotenv = require("dotenv");
dotenv.config();

var serverPort = 8080;
var port = process.env.PORT || serverPort;

app
  .listen(port, () => {
    // TODO: gestisci con log
    console.log(`Server on su porta ${port}`);
  })
  .on("error", (e) => {
    // TODO: gestisci con log
    console.log(e);
  });
