import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import BlankBox from "./components/BlankBox";

function App() {
    const [user, setUser] = useState();

    return (
        <div className = "min-h-full">
            <Header user = {user} setUser = {setUser} />
            <BlankBox isUserPresent = {user} />
            <Outlet />
        </div>
    );
};

export default App;
