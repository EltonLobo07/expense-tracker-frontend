import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import loginService from "../services/login";
import DisplayError from "./DisplayError";

let timeoutId;

function Login() {
    const [user, setUser] = useOutletContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e, loginDetailsObj = null) {
        e.preventDefault();

        try {
            let usernameAndToken;

            if (loginDetailsObj !== null)
                usernameAndToken = await loginService.login(loginDetailsObj);
            else
                usernameAndToken = await loginService.login({username, password});

            setUsername("");
            setPassword("");
            window.localStorage.setItem("usernameAndToken", JSON.stringify(usernameAndToken));
            setUser(usernameAndToken);
            navigate("/");
        }
        catch(err) {
            setErrMsg(err?.response?.data?.error || err.message);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setErrMsg(null), 5000);
        }
    };

    const height = user ? "calc(100vh - 115px)" : "calc(100vh - 45px)";

    return (
        <div className = "bg-gray-50 flex flex-col py-8 items-center gap-y-12 overflow-y-auto" style = {{height}}>
            <DisplayError msg = {errMsg} />

            <h1 className = "text-4xl font-medium">
                Login
            </h1>

            <button className = "btn btn-v1" onClick = {(e) => handleSubmit(e, {username: "Guest", password: "guest123"})}>
                Guest login
            </button>

            <form className = "mx-4 p-8 bg-white rounded-lg shadow-lg flex flex-col gap-y-6 w-1/2 min-w-[300px] max-w-md">
                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "username" className = "text-lg font-medium">
                        Username*
                    </label>

                    <input type = "text" id = "username" value = {username} onChange = {e => setUsername(e.target.value)} placeholder = "Your username" className = "bg-gray-50 p-1 rounded-sm" />
                </div>

                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "password" className = "text-lg font-medium">
                        Password*
                    </label>

                    <input type = {showPassword ? "text" : "password"} id = "password" value = {password} onChange = {e => setPassword(e.target.value)} placeholder = "Your password" className = "bg-gray-50 p-1 rounded-sm" />

                    <div className = "flex items-center gap-x-2">
                        <input type = "checkbox" id = "showPassword" checked = {showPassword} onChange = {() => setShowPassword(!showPassword)} className = "bg-gray-50" />

                        <label htmlFor = "showPassword">Show password</label>
                    </div>
                </div>

                <button type = "submit" className = "btn btn-v1" onClick = {handleSubmit}>
                    Submit
                </button>
            </form>

            <div className = "flex flex-col gap-y-6">
                <h2 className = "text-2xl text-gray-500">
                    Haven't signed up yet?
                </h2>
                <button onClick = {() => navigate("/signup")} className = "btn btn-v2">
                    Create new account
                </button>
            </div>
        </div>
    );
};

export default Login;
