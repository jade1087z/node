const express = require("express");
const app = express();
const port = 5050;
const mongoose = require("mongoose");
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", require("./Router/post.js"));

app.listen(port, () => {
    mongoose
        .connect(
            "mongodb+srv://imdoob:zz!!3125!!@cluster0.yqogsep.mongodb.net/blog?retryWrites=true&w=majority"
        )
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
