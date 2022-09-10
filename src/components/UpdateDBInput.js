import React, { useState } from "react";
import PropType from "prop-types";

function UpdateDBInput({ initialValue, valueName, service, inputType, inputId, textBeforeInput = "" }) {
    const [value, setValue] = useState(initialValue);
    const [update, setUpdate] = useState(false);
    const isInputTypeNumber = inputType === "number";

    function handleClick() {
        if (update) {
            const data = {};
            data[valueName] = isInputTypeNumber ? Number(value) : value;
            service(data).catch(err => console.log(err.message));
        }

        setUpdate(!update);
    };

    return (
        <div>
            <label htmlFor = {inputId} className = "capitalize">
                {`${valueName}: ${textBeforeInput}`}
            </label>

            {
                inputType === "textarea" ?
                <textarea id = {inputId} value = {value} onChange = {e => setValue(e.target.value)} disabled = {!update}>
                    {value}
                </textarea> 
                :
                <input type = {inputType} id = {inputId} value = {value} onChange = {e => setValue(e.target.value)} disabled = {!update} />
            }
            
            <button className = "btn btn-v1" onClick = {handleClick}>
                {
                    `${update ? "Save" : "Update"} ${valueName}`
                }
            </button>
        </div>
    );
};

UpdateDBInput.propType = {
    initialValue: PropType.any.isRequired,
    valueName: PropType.string.isRequired,
    service: PropType.func.isRequired,
    inputType: PropType.string.isRequired,
    inputId: PropType.string.isRequired,
    textBeforeInput: PropType.string
};  

export default UpdateDBInput;
