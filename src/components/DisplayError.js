import React from "react";

function DisplayError({ msg, isErr = true }) {
    const zIndex = msg ? 40 : -1;

    return (
        <div className = "fixed top-8 left-1/2 -translate-x-1/2 p-4 text-white text-lg flex flex-col items-center rounded-sm max-w-lg" style = {{zIndex, backgroundColor: `${isErr ? "#f44336" : "#4caf50"}`}}>
            {
                isErr ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                )
                : 
                (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            }
             
            <div className = "text-center">
                {msg}
            </div>
        </div>
    );
};

export default DisplayError;
