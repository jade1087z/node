import React, { useState } from "react";
import { UploadButtonDiv, UploadDiv, UploadForm } from "../style/UploadCSS";
import axios from "axios";
const Upload = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("제목 또는 내용을 채주요!");
        }

        let body = {
            title: title,
            content: content,
        };

        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    console.log(body);
                } else {
                    alert("글 작성이 실패하였습니다.");
                }
            })
            .catch((err) => console.log(err));
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
                        setTitle(e.currentTarget.value);
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
                {/* // 인풋의 값이 변하면 함수에 인풋의 벨류값을 저장시킴 */}
                <UploadButtonDiv>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
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
