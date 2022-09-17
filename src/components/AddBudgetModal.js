import React, { useState } from "react";
import PropTypes from "prop-types";
import categoryService from "../services/category";

function AddBudgetModal({ myZVal, onCancelClick, categories, setCategories, setBudgetFormZIndex, setAndCloseErrDisplayer }) {
    const [categoryName, setCategoryName] = useState("");
    const [limit, setLimit] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        categoryService.addCategory({name: categoryName, limit: Number(limit)})
                       .then((newCategoryData) => {
                            setAndCloseErrDisplayer("Category added", false);
                            setBudgetFormZIndex(10);
                            setCategories([...categories, newCategoryData]);
                       })
                       .catch(err => setAndCloseErrDisplayer(err));
                       
        setCategoryName("");
        setLimit("");
    };

    return (
        <div className = "flex items-start justify-center bg-black/30 absolute left-0 top-0 w-full h-full overflow-y-auto" style = {{zIndex: myZVal}} onClick = {onCancelClick} data-cancel = "yes">
            <form onSubmit = {handleSubmit} className = "mx-4 my-8 w-full max-w-lg flex flex-col gap-y-4 p-6 rounded-md bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className = "w-8 h-8 fill-red-500 stroke-white self-end cursor-pointer" data-cancel = "yes">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>

                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "categoryName" className = "text-lg font-medium">
                        Category name*
                    </label>
                    <input type = "text" id = "categoryName" value = {categoryName} onChange = {e => {setCategoryName(e.target.value)}} className = "p-1" />
                    {
                        categoryName.length < 2 ? 
                        (<div>
                            Name must be atleast 2 characters long
                        </div>)
                        :
                        (<div className = "h-6"></div>)
                    }
                </div>

                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "limit" className = "text-lg font-medium">
                        Category limit amount*
                    </label>
                    <input id = "limit" type = "number" value = {limit} onChange = {e => setLimit(e.target.value)} className = "p-1" />
                    {
                        Number(limit) === 0 ? 
                        (<div>
                            Limit cannot be 0
                        </div>)
                        :
                        (<div className = "h-6"></div>)
                    }
                </div>

                <button type = "submit" className = "btn btn-v1">
                    Submit
                </button>
            </form>
        </div>
    );
};

AddBudgetModal.propType = {
    myZVal: PropTypes.string.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    setCategories: PropTypes.func.isRequired,
    setBudgetFormZIndex: PropTypes.func.isRequired,
    setAndCloseErrDisplayer: PropTypes.func.isRequired
};

export default AddBudgetModal;
