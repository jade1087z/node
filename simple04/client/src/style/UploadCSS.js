import styled from "@emotion/styled";

const UploadDiv = styled.div`
    width: 100%;
    text-align: center;
`;

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

const UploadButtonDiv = styled.div`
    button {
        padding: 16px 100px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        border: 0;

        &:hover {
            color: black;
        }
    }
`;

export { UploadButtonDiv, UploadDiv, UploadForm };
