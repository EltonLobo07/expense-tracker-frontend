import React, { useState } from "react";
import userService from "../services/user";
import DisplayError from "./DisplayError";

let timeoutId;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const token = await userService.login({username, password});
            console.log(token);
            setUsername("");
            setPassword("");
        }
        catch(err) {
            setErrMsg(err?.response?.data?.error || err.message);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setErrMsg(null), 5000);
        }
    };

    return (
        <div className = "h-full bg-gray-50 flex flex-col justify-center items-center gap-y-12">
            <DisplayError msg = {errMsg} />

            <div className = "text-4xl font-medium">
                Login
            </div>

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
        </div>
    );
};

export default Login;
