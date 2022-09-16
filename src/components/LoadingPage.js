import React from "react";
import DisplayError from "./DisplayError";

function LoadingPage({ msg, errMsg }) {
    return (
        <div className = "h-screen flex justify-center items-center bg-gray-50">
            <DisplayError msg = {errMsg} />

            <div className = "text-lg">
                {msg}
            </div>
        </div>
    );
};

export default LoadingPage;
