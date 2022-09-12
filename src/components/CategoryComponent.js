import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CategoryComponent({ category }) {
    const navigate = useNavigate();

    function onClick(e) {
        if (e.target.tagName !== "BUTTON")
            navigate(`category/${category._id}`);
    };

    return (
        <div className = "w-full max-w-xl flex flex-col gap-y-4 p-4 bg-white rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" onClick = {onClick}>
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
