import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const List = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .post("/api/post/list")
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => console.log(err));
    }, [postList]);
    return (
        <div>
            <h3>
                {postList &&
                    postList.map((post, key) => (
                        <div key={key}>
                            <h4>제목 : {post.title}</h4>
                            <h4>내용 : {post.content}</h4>
                            <Link to={`/post/${post.postNum}`}>바로가기</Link>
                        </div>
                    ))}
            </h3>
        </div>
    );
};

export default List;
