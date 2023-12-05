import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    let params = useParams();
    let navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    useEffect(() => {
        let body = {
            postNum: params.postNum,
        };
        axios
            .post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post);
                }
            })
            .catch((err) => console.log(err));
    }, [params.postNum]);

    useEffect(() => {
        setTitle(postInfo.title);
        setContents(postInfo.contents);
    }, [postInfo]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (title === "" || contents === "") {
            return alert("글을 작성해주세요.");
        }

        let body = {
            title: title,
            content: contents,
            postNum: params.postNum,
        };

        axios
            .post("/api/post/edit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("게시글 수정 완료");
                    navigate(`/post/${params.postNum}`);
                } else {
                    alert("글 수정 실패");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <form action="">
                <label htmlFor="">제목</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                ></input>
                <label htmlFor="">내용</label>
                <textarea
                    name="contents"
                    id="contents"
                    cols="30"
                    rows="10"
                    value={contents}
                    onChange={(e) => {
                        setContents(e.currentTarget.value);
                    }}
                ></textarea>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                >
                    {" "}
                    취소하기{" "}
                </button>
                <button
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                >
                    {" "}
                    제출하기{" "}
                </button>
            </form>
        </div>
    );
};

export default Edit;
