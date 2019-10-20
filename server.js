const winston = require("winston");
const express = require("express");
const app = express();

app.use("/uploads", express.static("uploads"));

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

const port = 5000;
const server = app.listen(port, () =>
  winston.info(`Example app listening on port ${port}!`)
);

module.exports = server;
