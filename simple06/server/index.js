const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");
const { Counter } = require("./Model/Counter.js");

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

app.post("/api/test", (req, res) => {
    // const BlogPost = new Post(temp); // 블로그포스트라는 데이터베이스 연결 변수를 만들어 그곳에 body 데이터를 담아 전송한다.
    const BlogPost = new Post({
        title: "hi",
        content: "hello",
    });
    BlogPost.save()
        .then(() => {
            console.log(req, "전송");
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    // 넘버 추가 작업
    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogPost = new Post(temp);
            BlogPost.save().then(() => {
                Counter.updateOne(
                    { name: "counter" },
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
    console.log("api/post 요청");

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
app.post("/api/post/:id", (req, res) => {
    const postId = req.params.id;
    Post.findOne({ postNum: postId })
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
            console.log(err);
        });
});
