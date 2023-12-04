const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5050;
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");
const { Count } = require("./Model/Count.js");
const { allowedNodeEnvironmentFlags } = require("process");

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

app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    // 넘버 추가 작업
    Count.findOne({ name: "Count" })
        .exec()
        .then((count) => {
            temp.postNum = count.postNum;

            const BlogPost = new Post(temp);
            BlogPost.save().then(() => {
                Count.updateOne(
                    { name: "Count" },
                    { $inc: { postNum: 1 } }
                ).then(() => {
                    res.status(200).json({ success: true });
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

app.post("/api/post/list", (req, res) => {
    Post.find()
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc });
            // 여기서의 postList는 객체의 필드로 선언한 것이다. 클라이언트로 전달되는 특정 필드값
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/api/post/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, post: doc });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        });
});

// app.post("/api/post/edit", (req, res) => {
//     let temp = {
//         title: req.body.title,
//         content: req.body.content
//     }
//     Post.findOne({ postNum: postId })
//         .exec()
//         .then((doc) => {
//             console.log(doc);
//             res.status(200).json({ success: true, post: doc });
//         })
//         .catch((err) => {
//             res.status(400).json({ success: false });
//         });
// });

app.post("/api/post/edit", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content,
    };
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

app.post("/api/post/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
            console.log(err);
        });
});
