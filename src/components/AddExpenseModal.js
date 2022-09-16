import React, { useState } from "react";
import PropTypes from "prop-types";
import expenseService from "../services/expense";

function AddExpenseModal({ myZVal, onCancelClick, categories, setCategories, categoryName, setExpenseFormZIndex, setAndCloseErrDisplayer }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        expenseService.addExpense({description, amount: Number(amount), category: categoryName})
                      .then(expense => {
                        alert("Expense added!");
                        setCategories(categories.map(category => category.name === categoryName ? {...category, total: Number((category.total + expense.amount).toFixed(2))} : category));
                        setExpenseFormZIndex(10);
                      })
                      .catch(err => setAndCloseErrDisplayer(err));

        setDescription("");
        setAmount("");
    };

    return (
        <div className = "flex items-start justify-center bg-black/30 absolute left-0 top-0 w-full h-full overflow-y-auto" style = {{zIndex: Number(myZVal)}} onClick = {onCancelClick} data-cancel = "yes">
            <form onSubmit = {handleSubmit} className = "mx-4 my-8 w-full max-w-lg flex flex-col gap-y-4 p-6 rounded-md bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className = "w-8 h-8 fill-red-500 stroke-white self-end cursor-pointer" data-cancel = "yes">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>

                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "description" className = "text-lg font-medium">
                        Description*
                    </label>
                    <textarea id = "description" value = {description} onChange = {e => {setDescription(e.target.value)}} rows = {3} className = "p-1 resize-y min-h-[32px]">
                    </textarea>
                    {
                        description.length < 5 ? 
                        (<div>
                            Description must be atleast 5 characters long
                        </div>)
                        :
                        (<div className = "h-6"></div>)
                    }
                </div>

                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "amount" className = "text-lg font-medium">
                        Amount*
                    </label>
                    <input id = "amount" type = "number" value = {amount} onChange = {e => setAmount(e.target.value)} className = "p-1" />
                    {
                        Number(amount) === 0 ? 
                        (<div>
                            Amount cannot be 0
                        </div>)
                        :
                        (<div className = "h-6"></div>)
                    }
                </div>
                
                <div className = "flex gap-x-2 text-lg font-medium">
                    <div>
                        Category:
                    </div>
                    <div className = "capitalize">
                        {categoryName}
                    </div>
                </div>

                <button type = "submit" className = "btn btn-v1">
                    Submit
                </button>
            </form>
        </div>
    );
};

AddExpenseModal.propType = {
    myZVal: PropTypes.string.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    setCategories: PropTypes.func.isRequired,
    categoryName: PropTypes.string,
    setExpenseFormZIndex: PropTypes.func.isRequired,
    setAndCloseErrDisplayer: PropTypes.func.isRequired
};

export default AddExpenseModal;
