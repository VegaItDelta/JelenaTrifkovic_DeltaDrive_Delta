const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

const configureMiddlewares = (app) => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
};

module.exports = { configureMiddlewares };
