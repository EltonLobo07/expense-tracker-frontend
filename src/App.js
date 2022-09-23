import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import BlankBox from "./components/BlankBox";
import Login from "./components/Login";

function App() {
    const userAndTokenInLS = window.localStorage.getItem("usernameAndToken");
    const [user, setUser] = useState(userAndTokenInLS ? JSON.parse(userAndTokenInLS) : null);

    return (
        <div className = "min-h-full">
            <Header user = {user} setUser = {setUser} />
            <BlankBox isUserPresent = {user} />
            <Outlet context = {[user, setUser]} />
        </div>
    );
};

export default App;
