import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ExpenseComponent({ expense }) {
    const navigate = useNavigate();

    return (
        <div className = "border border-green-300 flex flex-col gap-y-2 p-2">
            <div>
                Description: {expense.description}
            </div>

            <div>
                Amount: ${expense.amount}
            </div>

            <div>
                Date: {expense.date}
            </div>

            <div>
                Added on: {expense.added}
            </div>

            <button className = "btn btn-v1 w-fit" onClick = {() => navigate(`/expense/${expense._id}`)}>
                View Expense
            </button>
        </div>
    );
};

ExpenseComponent.propTypes = {
    expense: PropTypes.object.isRequired
};

export default ExpenseComponent;
