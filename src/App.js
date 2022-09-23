import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import BlankBox from "./components/BlankBox";

function App() {
    const userAndTokenInLS = window.localStorage.getItem("usernameAndToken");
    const [user, setUser] = useState(userAndTokenInLS ? JSON.parse(userAndTokenInLS) : null);

    return (
        <>
            <Header user = {user} setUser = {setUser} />
            <BlankBox isUserPresent = {user !== null} />
            <Outlet context = {[user, setUser]} />
        </>
    );
};

export default App;
