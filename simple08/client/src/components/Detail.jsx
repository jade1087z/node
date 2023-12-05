import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params.postNum);
    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        let body = {
            postNum: params.postNum,
        };
        axios
            .post("/api/post/detail", body)
            .then((response) => {
                console.log(response);
                setPostInfo(response.data.post);
            })
            .catch((err) => console.log(err));
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
            <h3>{postInfo.title}</h3>
            <p>{postInfo.content}</p>
            {/* /* <img src={`http://localhost:5050/${postInfo.image}`} alt="d" style={{width: 100%}}}/>   */}
            <Link to={`/edit/${postInfo.postNum}`}>수정하기</Link>
            <button onClick={() => DeleteHandler()}>삭제</button>
        </div>
    );
};

export default Detail;
