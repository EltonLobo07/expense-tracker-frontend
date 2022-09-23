import React from "react";
import { useNavigate } from "react-router-dom";

const usernameCharacterLimit = 20; // Minimum character limit should be 3 for the below function to work properly

function getUsername(user) {
    const username = user.username;

    if (username.length > usernameCharacterLimit)
        return username.slice(0, usernameCharacterLimit - 3) + "...";

    return username;
};

function Header({ user, setUser }) {
    const navigate = useNavigate();

    return (
        <div className = "flex flex-col items-center gap-y-2 p-2 fixed z-10 w-full shadow-md bg-gray-50 text-lg">
            <div className = "flex gap-x-8 text-blue-700">
                <button className = "border-b border-gray-50 hover:border-blue-700 px-2" onClick = {() => navigate("/categories")}>
                    Categories
                </button>
                <button className = "border-b border-gray-50 hover:border-blue-700 px-2" onClick = {() => navigate("/login")}>
                    Login
                </button>
                <button className = "border-b border-gray-50 hover:border-blue-700 px-2" onClick = {() => navigate("/signup")}>
                    Signup
                </button>
            </div>

            {
                user
                ?
                (
                    <div className = "flex flex-col gap-y-1 items-center">
                        <span className = "font-medium">
                            Hello {getUsername(user)}!
                        </span>

                        <button className = "btn btn-v1 py-0 w-fit">
                            Logout
                        </button>
                    </div>
                )
                :
                null
            }
        </div>
    );
};

export default Header;
