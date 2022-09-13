import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CategoryComponent({ category }) {
    const navigate = useNavigate();

    function onClick(e) {
        if (e.target.tagName !== "BUTTON")
            navigate(`category/${category._id}`);
    };

    const percentUsed = category.total / category.limit;

    function generateBarProgressColor() {
        if (percentUsed >= 0.75)
            return "#f44336"; // Same as tailwind red-500

        if (percentUsed >= 0.5)
            return "#ffeb3b"; // Same as tailwind yellow-500

        return "#4caf50"; // Same as tailwind green-500
    };

    return (
        <div className = "w-full max-w-xl flex flex-col gap-y-2 p-4 bg-white rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" onClick = {onClick} style = {{
            backgroundColor: `${percentUsed >= 1 ? "#d32f2f" : "white"}`
        }}>
            <div className = "flex flex-col gap-y-2 my-xsm:flex-row my-xsm:justify-between">
                <div className = "capitalize font-medium text-lg">
                    {category.name}
                </div>

                <div>
                    <span className = "font-medium text-lg">
                        {`$${category.total}`}
                    </span>
                    <span className = "text-gray-500" style = {{
                        color: `${percentUsed >= 1 ? "black" : "#9e9e9e"}`
                    }}>
                        {` / $${category.limit}`}
                    </span> 
                </div>
            </div>

            <div className = "w-full h-2 bg-gray-50 rounded-lg">
                <div className = "h-full rounded-lg" style = {{
                    width: `${Math.min(100, percentUsed * 100)}%`,
                    backgroundColor: generateBarProgressColor()
                }}>
                </div>
            </div>

            <button className = "btn btn-v1 self-end" data-category = {category.name}>
                Add Expense
            </button>
        </div>
    );
};

CategoryComponent.propTypes = {
    category: PropTypes.object.isRequired
};

export default CategoryComponent;
