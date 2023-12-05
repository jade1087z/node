import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .post("/api/post/list")
            .then((res) => {
                if (res.data.success) {
                    setPostList([...res.data.postList]);
                }
            })
            .catch((err) => console.log(err));
    }, [postList]);

    return (
        // <div>
        //     {postList &&
        //         postList.map((post, key) => (
        //             <div
        //                 key={key}
        //                 style={{ border: "1px solid black", margin: "20px" }}
        //             >
        //                 <h4>제목: {post.title}</h4>
        //                 <p>내용: {post.content}</p>
        //                 <Link to={`/post/${post.postNum}`}>바로 가기</Link>
        //             </div>
        //         ))}
        // </div>
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
