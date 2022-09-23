import React from "react";

function BlankBox({ isUserPresent }) {
    const height = isUserPresent ? "115px" : "45px";

    return (
        <div style = {{height}}></div>
    );
};

export default BlankBox;
