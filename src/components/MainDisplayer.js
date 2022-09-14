import React, { useEffect, useState } from "react";
import CategoryService from "../services/category";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import Categories from "./Categories";

function MainDisplayer() {
    const [categories, setCategories] = useState(null);
    const [expenseFormZIndex, setExpenseFormZIndex] = useState(10);
    const [addExpenseCategory, setAddExpenseCategory] = useState(null);
    const [budgetFormZIndex, setBudgetFormZIndex] = useState(10);
    // Doesn't matter if someChange is set to true or false
    // What matters is that its value is toggled whenever categories is changed in the DB

    function showAddExpenseModal(e) {
        if (e.target.dataset?.category !== undefined) {
            setExpenseFormZIndex(30);
            setAddExpenseCategory(e.target.dataset.category);
        }
    };

    function hideAddExpenseModal(e) {
        if (e.target.dataset?.cancel === "yes" || e.target.tagName === "path") 
        // svg element or an element with data attribute of cancel set to yes
            setExpenseFormZIndex(10);
    };

    function showAddBudgetModal() {
        setBudgetFormZIndex(30);
    };

    function hideAddBudgetModal(e) {
        if (e.target.dataset?.cancel === "yes" || e.target.tagName === "path") 
        // svg element or an element with data attribute of cancel set to yes
            setBudgetFormZIndex(10);
    };

    useEffect(() => {
        CategoryService.getAllCategories()
                       .then(categories => setCategories(categories))
                       .catch(err => console.log(err.message));
    }, []);

    if (categories === null) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className = "relative z-0 h-screen">
            <Categories categories = {categories}
                        onAddExpenseClick = {showAddExpenseModal} 
                        onAddBudgetClick = {showAddBudgetModal} />

            <AddExpenseModal myZVal = {expenseFormZIndex} 
                             onCancelClick = {hideAddExpenseModal} 
                             categories = {categories} 
                             setCategories = {setCategories} 
                             categoryName = {addExpenseCategory} 
                             setExpenseFormZIndex = {setExpenseFormZIndex} />

            <AddBudgetModal myZVal = {budgetFormZIndex} 
                            onCancelClick = {hideAddBudgetModal} 
                            categories = {categories} 
                            setCategories = {setCategories} 
                            setBudgetFormZIndex = {setBudgetFormZIndex} />
        </div>
    );
};

export default MainDisplayer;
