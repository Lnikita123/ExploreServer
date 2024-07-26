const express = require("express");
const bodyParser = require("body-parser");
const route = require("./Route/route");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cookieSession = require("cookie-session");
require('dotenv').config();

const app = express();

// Enable All CORS Requests for development use
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:444",
      "http://localhost:5174",
      "http://localhost:3000",
      "https://wondrous-centaur-9afc67.netlify.app"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Cookie"],
  })
);

app.use(multer().any());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(
    "mongodb+srv://dxv42198:KVLcA1bWcl3KXmuZ@cluster0.qnt5rum.mongodb.net/ExportITMain",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use(
  cookieSession({
    signed: false,
    secure: false,
    sameSite: "strict",
  })
);

app.use("/", route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`);
});

module.exports = app;
