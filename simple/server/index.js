const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const config = require("../server/config/key.js");

const app = express();
const port = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));

app.use("/api/post", require("../server/router/post.js"));
app.use("/api/user", require("../server/router/user.js"));

app.listen(port, () => {
    mongoose
        .connect(config.mongoURI)
        .then(() => {
            console.log("listening -->", port);
            console.log("mongoose --> connect");
        })
        .catch((err) => {
            console.log(err);
        });
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
