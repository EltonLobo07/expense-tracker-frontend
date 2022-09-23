import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user";
import DisplayError from "./DisplayError";

let timeoutId;

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrMsg("Password and confirm password don't match");
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setErrMsg(null), 5000);
            return;
        }

        try {
            await userService.signup({username, password});
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            navigate("/login");
        }
        catch(err) {
            setErrMsg(err?.response?.data?.error || err.message);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setErrMsg(null), 5000);
        }
    };

    return (
        <div className = "min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-y-12">
            <DisplayError msg = {errMsg} />

            <div className = "text-4xl font-medium">
                Signup
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

                    <input type = "password" id = "password" value = {password} onChange = {e => setPassword(e.target.value)} placeholder = "Your password" className = "bg-gray-50 p-1 rounded-sm" />
                </div>

                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "confirmPassword" className = "text-lg font-medium">
                        Confirm password*
                    </label>

                    <input type = "password" id = "confirmPassword" value = {confirmPassword} onChange = {e => setConfirmPassword(e.target.value)} placeholder = "Your password (again)" className = "bg-gray-50 p-1 rounded-sm" />
                </div>

                <button type = "submit" className = "btn btn-v1" onClick = {handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
