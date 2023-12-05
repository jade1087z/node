import React, { useState } from "react";
import axios from "axios";
import {
    UploadWrap,
    UploadTitle,
    UploadForm,
    Button,
} from "../uploadCSS/UploadCSS.js";

import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload.jsx";

const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState();

    let navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        let body = {
            title: title,
            content: content,
            image: image,
        };
        if (title === "" || content === "") {
            return alert("내용을 채워주세요");
        }
        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("게시글 작성 완료");
                    navigate("/list");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <UploadWrap>
            <UploadTitle>글 작성</UploadTitle>
            <UploadForm>
                <label htmlFor="">제목</label>

                <input
                    type="text"
                    input="title"
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                />
                <br />

                <ImageUpload setImage={setImage} />
                <br />

                <label htmlFor="">내용</label>
                <textarea
                    name="content"
                    id="content"
                    cols="30"
                    rows="10"
                    onChange={(e) => {
                        setContent(e.currentTarget.value);
                    }}
                ></textarea>
                <Button
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                >
                    작성하기
                </Button>
            </UploadForm>
        </UploadWrap>
    );
};

export default Upload;
