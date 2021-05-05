const express = require("express");

const dbConnector = require("./utils/db");
const app = express();

const PORT = process.env.PORT || 3000;

dbConnector(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
