const express = require("express");
const path = require("path");
const app = express();
const port = 5050;
const mongoose = require("mongoose");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // -> body parser

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
    mongoose
        .connect(
            "mongodb+srv://imdoob:zz!!3125!!@cluster0.yqogsep.mongodb.net/blog?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("listening ==>", port);
            console.log("connect --> mongo");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// app.post("/api/test", (req, res) => {
//     const CommunityPost = new Post({
//         title: "제목 내용",
//         content: "테스트 내용입니다.",
//     });
//     CommunityPost.save().then(() => {
//         console.log(req, "전송");
//         res.status(200).json({ success: true, text: "데이터 받았어" });
//     });
// });

app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    console.log(temp);
    const BlogPost = new Post(temp);
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

app.post("/api/post/list", (req, res) => {
    console.log("api/post 요청");
    Post.find()
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc });
            // post라는 스키마에 가서 모든 정보를 찾는다.
            // 찾으면 문서라는 이름으로 데이터를 저장해 값이 트루이면 postlist에 저장한다.
        })
        .catch((err) => {
            console.log(err, "에러");
            res.status(400).json({ success: false });
        });
});
