import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CategoryComponent({ category, onAddExpenseClick }) {
    const navigate = useNavigate();

    return (
        <div className = "border border-orange-300 p-2 flex flex-col gap-y-2 w-1/2">
            <div className = "flex justify-between">
                <div className = "capitalize">
                    {category.name}
                </div>

                <div>
                    {`$${category.total} / $${category.limit}`}
                </div>
            </div>

            <div className = "border border-indigo-300 flex justify-end gap-x-4">
                <button className = "btn btn-v1" onClick = {() => onAddExpenseClick(category.name)}>
                    Add Expense
                </button>

                <button className = "btn btn-v1" onClick = {() => navigate(`category/${category._id}`)}>
                    View Expenses
                </button>
            </div>
        </div>
    );
};

CategoryComponent.propTypes = {
    category: PropTypes.object.isRequired,
    onAddExpenseClick: PropTypes.func.isRequired
};

export default CategoryComponent;
