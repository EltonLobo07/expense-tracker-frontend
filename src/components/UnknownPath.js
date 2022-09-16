import React from "react";
import { useNavigate } from "react-router-dom";

function UnknownPath() {
    const navigate = useNavigate();

    return (
        <div className = "h-screen flex flex-col justify-center items-center bg-gray-50 gap-y-4">
            <div className = "text-lg">
                Unknown path
            </div>

            <button className = "btn btn-v1" onClick = {() => navigate("/categories")}>
                Go to categories
            </button>
        </div>
    );
};

export default UnknownPath;
