import React, { useEffect, useState } from "react";
import Category from "./CategoryComponent";
import PropTypes from "prop-types";

function Categories({ categories, onAddExpenseClick, onAddBudgetClick }) {
    return (
        <div className = "p-12 flex flex-col gap-y-8 absolute left-0 top-0 z-20 bg-gray-50 w-full h-full overflow-auto">
            <div className = "flex flex-col my-sm:flex-row my-sm:justify-around items-center gap-y-2">
                <div className = "text-4xl my-sm:text-5xl font-semibold pb-2">
                    Categories
                </div>

                <button className = "btn btn-v2 h-fit" onClick = {onAddBudgetClick}>
                    Add Category
                </button>
            </div>

            <div className = "flex items-center flex-col gap-y-4 py-4">
                {
                    categories.map(category => <Category key = {category._id} category = {category} onAddExpenseClick = {onAddExpenseClick} />)
                }
            </div>
        </div>
    );
};

Categories.propType = {
    categories: PropTypes.array.isRequired,
    onAddExpenseClick: PropTypes.func.isRequired,
    onAddBudgetClick: PropTypes.func.isRequired
};

export default Categories;
