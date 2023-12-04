import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
    let params = useParams();
    const navigate = useNavigate();
    const [postInfo, setPostInfo] = useState();

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
            .catch((err) => {
                console.log(err);
            });
    }, [params.postNum]);

    const DeleteHandler = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            let body = {
                postNum: params.postNum,
            };
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigate("/list");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("게시글 삭제가 실패했습니다.");
                });
        }
    };
    return (
        <div>
            <span>{postInfo && postInfo.postNum}</span>
            <h3>{postInfo && postInfo.title}</h3>
            <p>{postInfo && postInfo.content}</p>
            <Link to={postInfo && `/edit/${postInfo.postNum}`}>
                <button>수정</button>
            </Link>
            <button onClick={() => DeleteHandler()}>글 삭제하기</button>
        </div>
    );
};

export default Detail;
