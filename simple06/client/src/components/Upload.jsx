import React, { useState } from "react";
import { UploadButtonDiv, UploadDiv, UploadForm } from "../css/UploadCSS";
import axios from "axios";

const Upload = () => {
    const [title, setTilte] = useState("");
    const [content, setContent] = useState("");

    const onsubmit = (e) => {
        e.preventDefault();

        let body = {
            title: title,
            content: content,
        };

        if (title === "" || content === "") {
            return alert("글을 작성해주세요");
        } else {
        }

        axios.post("/api/post/submit", body).then((response) => {
            if (response.data.success) {
                alert("게시글 작성 완료");
                // navigator("/list");
                console.log(body);
            } else {
            }
        });
    };
    return (
        <UploadDiv>
            <h3>Upload</h3>
            <UploadForm>
                <label htmlFor="title">제목</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTilte(e.currentTarget.value);
                    }}
                ></input>

                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value);
                    }}
                ></textarea>
                <br />

                <UploadButtonDiv>
                    <button
                        onClick={(e) => {
                            onsubmit(e);
                        }}
                    >
                        버튼
                    </button>
                </UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    );
};

export default Upload;
