import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    let params = useParams();
    let navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        let body = {
            postNum: params.postNum,
        };
        axios
            .post(`/api/post/detail`, body)
            .then((response) => {
                setPostInfo(response.data.post);
                console.log(response.data.post);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params.postNum]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("내용을 채우세요");
        }
        let body = {
            title: title,
            content: content,
            postNum: params.postNum,
        };

        axios.post("/api/post/edit", body).then((response) => {
            if (response.data.success) {
                alert("글 수정이 완료됐습니다.");
                navigate(`/post/${params.postNum}`);
            } else {
                alert("글 수정이 실패.");
            }
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <form action="">
                <label htmlFor="title">제목</label>
                <input
                    type="text"
                    id="title"
                    value={title || ""}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value);
                    }}
                    placeholder={postInfo.title}
                />
                <br />
                <label htmlFor="content">내용</label>
                <textarea
                    name="content"
                    id="content"
                    cols="30"
                    rows="10"
                    value={content || ""}
                    onChange={(event) => {
                        setContent(event.currentTarget.value);
                    }}
                    placeholder={postInfo.content}
                ></textarea>

                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        취소
                    </button>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >
                        제출
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
