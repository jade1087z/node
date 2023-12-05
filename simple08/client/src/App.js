import React from "react";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import List from "./components/List";
import Upload from "./components/Upload";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
const App = () => {
    return (
        <div>
            <Header />
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
