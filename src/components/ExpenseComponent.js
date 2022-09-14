import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ExpenseComponent({ expense }) {
    const navigate = useNavigate();

    const expenseDate = new Date(expense.date); 

    function gotoExpense(e) {
        navigate(`/expense-${expense._id}`);
    };

    return (
        <div className = "w-full max-w-xl min-w-[300px] flex flex-col gap-y-4 p-4 bg-white rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" onClick = {gotoExpense}>
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
    );
};

ExpenseComponent.propTypes = {
    expense: PropTypes.object.isRequired
};

export default ExpenseComponent;
