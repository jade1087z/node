import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
    // let body = {
    //     text: "다시보낼께~",
    // };
    // const [Text, setText] = useState("");
    // useEffect(() => {
    //     axios
    //         .post("/api/test", body)
    //         .then((response) => {
    //             alert("요청성공");
    //             console.log(response);
    //             setText(response.data.text);
    //         })
    //         .catch((err) => {
    //             alert("요청실패");
    //             console.log(err);
    //         });
    // });
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .post("/api/post/list")
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => console.log(err));
    });

    return (
        <div>
            <h3>글 목록</h3>
            {postList.map((post, key) => (
                <div key={key}>
                    <h3>제목: {post.title}</h3>
                    <p>내용: {post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default List;
