let express = require("express");
let router = express.Router();
let multer = require("multer");

// let upload = multer({ dest: ""})

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");

router.post("/submit", (req, res) => {
    let temp = req.body;
    const BlogPost = new Post(temp);

    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogPosts = new Post(temp);
            BlogPosts.save().then(() => {
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
//  create

router.post("/list", (req, res) => {
    let temp = req.body;
    Post.find()
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
            console.log(err);
        });
});
//  read

router.post("/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, post: doc });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/delete", (req, res) => {
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

router.post("/edit", (req, res) => {
    let temp = { title: req.body.title, content: req.body.content };
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "image/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ success: false });
        } else {
            res.status(200).json({
                success: true,
                filePath: res.req.file.path,
            });
        }
    });
});
module.exports = router;
