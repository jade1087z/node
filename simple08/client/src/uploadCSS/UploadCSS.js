import styled from "@emotion/styled";

const UploadWrap = styled.form``;
const UploadTitle = styled.h2``;

const UploadForm = styled.form`
    width: 100%;
    textarea {
        width: 600px;
        height: 300px;
        border: 2px solid blue;
        border-radius: 4px;
    }
    label {
        display: block;
    }
    input {
        width: 600px;
        height: 68px;
        outline: none;
        border-radius: 4px;
    }
`;

const Button = styled.button`
    padding: 16px 100px;
    background-color: black;
    color: #fff;
    font-size: 24px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    border: 0;

    &:hover {
        color: black;
    }
`;

export { UploadWrap, UploadTitle, Button, UploadForm };
