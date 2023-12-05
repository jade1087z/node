import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import List from "./components/List";
import Upload from "./components/Upload";
import Home from "./components/Home";
import Detail from "./components/Detail";

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/post/:postNum" element={<Detail />} />
                <Route path="/post/:postNum" element={<Detail />} />
            </Routes>
        </div>
    );
};

export default App;
