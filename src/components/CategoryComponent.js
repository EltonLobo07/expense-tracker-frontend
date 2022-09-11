import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CategoryComponent({ category, onAddExpenseClick }) {
    const navigate = useNavigate();

    return (
        <div className = "w-full max-w-xl flex flex-col gap-y-4 p-4 bg-white rounded-md shadow-md">
            <div className = "flex flex-col gap-y-2 my-xsm:flex-row my-xsm:justify-between">
                <div className = "capitalize font-medium text-lg">
                    {category.name}
                </div>

                <div>
                    <span className = "font-medium text-lg">
                        {`$${category.total}`}
                    </span>
                    <span className = "text-gray-500">
                        {` / $${category.limit}`}
                    </span> 
                </div>
            </div>

            <div className = "flex justify-end gap-x-4">
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
