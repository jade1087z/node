import React from "react";
import Heading from "./components/Heading";
import { Route, Routes } from "react-router-dom";
import List from "./components/List";
import Upload from "./components/Upload";
import Home from "./components/Home";

const App = () => {
    return (
        <div>
            <Heading />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </div>
    );
};

export default App;
