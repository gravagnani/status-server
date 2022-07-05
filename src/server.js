import dotenv from 'dotenv';

import app from './app.js';

// const dotenv = require("dotenv");
dotenv.config();

app
  .listen(process.env.PORT || 8080, () => {
    // TODO: gestisci con log
    console.log(`Server on su porta ${process.env.PORT || 8080}`);
  })
  .on("error", (e) => {
    // TODO: gestisci con log
    console.log(e);
  });
