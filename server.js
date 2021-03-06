const winston = require("winston");
const config = require("config");
const express = require("express");
const app = express();

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
