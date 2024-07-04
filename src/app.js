const express = require("express");
const path = require("path");
const app = express();

const imageRouter = require("./imageUpload/imageRouter");
app.use(express.static(path.join(__dirname, "public")));

app.use("/image", imageRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

module.exports = app;
