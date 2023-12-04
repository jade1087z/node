import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import List from "./component/List";
import Upload from "./component/Upload";
import Head from "./component/Head";
import Detail from "./component/Detail";
import Edit from "./component/Edit";
const App = () => {
    return (
        <div>
            <Head />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/post/:postNum" element={<Detail />} />
                <Route path="/edit/:postNum" element={<Edit />} />
            </Routes>
        </div>
    );
};

export default App;
