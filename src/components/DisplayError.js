import React from "react";

function DisplayError({ msg }) {
    const zIndex = msg ? 40 : -1;

    return (
        <div className = "fixed top-8 left-1/2 -translate-x-1/2 p-4 bg-red-500 text-white text-lg flex flex-col items-center rounded-sm max-w-lg" style = {{zIndex}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg> 
            <div className = "text-center">
                {msg}
            </div>
        </div>
    );
};

export default DisplayError;
