import React, { useEffect, useState } from "react";
import Category from "./CategoryComponent";
import PropTypes from "prop-types";

function Categories({ categories, onAddExpenseClick, onAddBudgetClick }) {
    return (
        <div className = "p-12 flex flex-col gap-y-8 absolute left-0 top-0 h-full w-full z-20 bg-pink-200">
            <div className = "flex items-center justify-around">
                <div className = "text-5xl font-semibold border border-yellow-300 pb-2">
                    Budgets
                </div>

                <button className = "btn btn-v2 h-fit" onClick = {onAddBudgetClick}>
                    Add Budget
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
