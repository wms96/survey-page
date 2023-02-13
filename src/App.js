import React, {useEffect, useRef, useState} from 'react';
import {HashRouter, Link, Route, Routes, Navigate} from "react-router-dom";
import Surveys from "./pages/Surveys/Surveys";
import Details from "./pages/Details/Details";


const Users = () => {
    return <Details/>;
}

export const App = () => (
    <>
        <HashRouter>
            <Routes>
                <Route path="/home" element={<Surveys/>}/>
                <Route path=":code" element={<Users/>}/>
                <Route path="*" element={<Navigate replace to="/home"/>}/>
            </Routes>
        </HashRouter>
    </>
);
