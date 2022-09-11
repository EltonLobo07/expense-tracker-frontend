import React, { useState } from "react";
import PropTypes from "prop-types";
import expenseService from "../services/expense";

function AddExpenseModal({ category, myZVal, onCancelClick, toggleSomeChange }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        expenseService.addExpense({description, amount: Number(amount), category})
                      .then(expense => {
                        alert("Expense added!");
                        onCancelClick();
                        toggleSomeChange();
                      })
                      .catch(err => console.log(err.message));

        setDescription("");
        setAmount("");
    };

    const zIndexVal = `z-${myZVal}`;

    return (
        <div className = {`flex items-center justify-center bg-black/30 absolute left-0 top-0 h-full w-full ${zIndexVal}`}>
            <form onSubmit = {handleSubmit} className = "border border-yellow-300 bg-green-100 flex flex-col gap-y-4 p-4 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className = "w-8 h-8 fill-red-500 stroke-white self-end" onClick = {onCancelClick}>
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>

                <div>
                    <label htmlFor = "description">
                        Description*:
                    </label>
                    <textarea id = "description" value = {description} onChange = {e => {setDescription(e.target.value)}}></textarea>
                </div>

                <div>
                    <label htmlFor = "amount">
                        Amount*:
                    </label>
                    <input id = "amount" type = "number" value = {amount} onChange = {e => setAmount(e.target.value)} />
                </div>
                
                <div className = "flex gap-x-4 text-black">
                    <div>Category: </div>
                    <div>{category}</div>
                </div>

                <button type = "submit" className = "btn btn-v1">
                    Submit
                </button>
            </form>
        </div>
    );
};

AddExpenseModal.propType = {
    category: PropTypes.string.isRequired,
    myZVal: PropTypes.string.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    toggleSomeChange: PropTypes.func.isRequired
};

export default AddExpenseModal;
