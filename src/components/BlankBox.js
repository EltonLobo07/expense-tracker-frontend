import React from "react";

function BlankBox({ isUserPresent }) {
    const height = isUserPresent ? "110px" : "45px";

    return (
        <div style = {{height, border: "1px solid black"}}></div>
    );
};

export default BlankBox;
