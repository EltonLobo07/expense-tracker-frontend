import React, { useState, useEffect } from "react";
import Category from "./CategoryComponent";
import PropTypes from "prop-types";

function orderCategories(sortByPercent, sortReverse, categories) {
    if (!sortByPercent) 
        return categories;

    const mul = sortReverse ? -1 : 1;

    const categoriesShallowCpy = categories.map(category => category);

    categoriesShallowCpy.sort((cat1, cat2) => mul * ((cat1.total / cat1.limit) - (cat2.total / cat2.limit)));

    return categoriesShallowCpy;
};

function Categories({ categories, onAddExpenseClick, onAddBudgetClick }) {
    const [sortByPercent, setSortByPercent] = useState(false);
    const [sortReverse, setSortReverse] = useState(false);

    const orderedCategories = orderCategories(sortByPercent, sortReverse, categories);

    return (
        <div className = "p-8 flex flex-col gap-y-8 absolute left-0 top-0 z-20 bg-gray-50 w-full h-full overflow-y-auto">
            <div className = "flex flex-col my-sm:flex-row my-sm:justify-around items-center gap-y-2">
                <div className = "text-4xl my-sm:text-5xl font-semibold pb-2">
                    Categories
                </div>

                <button className = "btn btn-v2 h-fit" onClick = {onAddBudgetClick}>
                    Add Category
                </button>
            </div>

            <div className = "flex flex-col gap-y-4 items-center">
                <div className = "flex flex-col gap-y-1 justify-center items-center">
                    <label htmlFor = "sortByPercent" className = "text-lg font-medium">
                        Sort by %    
                    </label>
                    <input type = "checkbox" id = "sortByPercent" checked = {sortByPercent} onChange = {() => {setSortByPercent(!sortByPercent)}} />                    
                </div>

                <div className = "flex flex-col gap-y-1 justify-center items-center">
                    <label htmlFor = "sortReverse" className = "text-lg font-medium">
                        Sort order (decreasing)
                    </label>
                    <input type = "checkbox" id = "sortReverse" checked = {sortReverse} onChange = {() => setSortReverse(!sortReverse)} />                    
                </div>
            </div>

            <div className = "flex items-center flex-col gap-y-4 py-4" onClick = {onAddExpenseClick}>
                {
                    orderedCategories.length === 0 
                    ?
                    (
                        <div className = "text-lg">
                            No categories added
                        </div>
                    )
                    : 
                    orderedCategories.map(category => <Category key = {category._id} category = {category} />)
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
