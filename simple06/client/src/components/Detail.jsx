import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
    const [postList, setPostList] = useState();
    const postId = useParams();
    const id = postId.postNum;
    console.log(postId);
    console.log(id);
    axios
        .post(`/api/post/${id}`)
        .then((response) => {
            console.log(response);
            if (response.data.success) {
                setPostList(response.data.postList);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    return (
        <div>
            <div>
                <span>{postList && postList.postNum}</span>
                <h3>{postList && postList.title}</h3>
                <p>{postList && postList.content}</p>
            </div>
        </div>
    );
};

export default Detail;
