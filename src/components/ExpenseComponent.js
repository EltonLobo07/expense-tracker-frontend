import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ExpenseComponent({ expense }) {
    const navigate = useNavigate();
    const [bgColor, setBgColor] = useState("white");

    const expenseDate = new Date(expense.date); 

    function gotoExpense(e) {
        if (e.target.dataset?.cancel !== "yes")
            navigate(`/expense-${expense._id}`);
    };

    return (
        <div className = "w-full max-w-xl min-w-[300px] flex gap-x-1 items-start p-4 rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" style = {{backgroundColor: bgColor}} onClick = {gotoExpense}>
            <div className = "flex-grow flex flex-col gap-y-2">
                <div className = "font-medium line-clamp-2">
                    {expense.description}
                </div>

                <div>
                    {`${String(expenseDate.getDate()).padStart(2, "0")}/${String(expenseDate.getMonth() + 1).padStart(2, "0")}/${expenseDate.getFullYear()}`}
                </div>

                <div className = "font-medium text-lg">
                    {`$${expense.amount}`}
                </div>
            </div>

            <div className = "shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className = "w-8 h-8 fill-red-500 stroke-white self-end cursor-pointer" onMouseOver = {() => {setBgColor("#e57373")}} onMouseLeave = {() => setBgColor("white")} data-expenseid = {expense._id} data-cancel = "yes">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" data-expenseid = {expense._id} data-cancel = "yes" />
                </svg>
            </div>
        </div>
    );
};

ExpenseComponent.propTypes = {
    expense: PropTypes.object.isRequired
};

export default ExpenseComponent;
