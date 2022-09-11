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
    const [someChange, setSomeChange] = useState(true);
    // Doesn't matter if someChange is set to true or false
    // What matters is that its value is toggled whenever categories is changed in the DB

    function toggleSomeChange() {
        setSomeChange(!someChange);
    };

    function showAddExpenseModal(category) {
        setExpenseFormZIndex(30);
        setAddExpenseCategory(category);
    };

    function hideAddExpenseModal() {
        setExpenseFormZIndex(10);
    };

    function showAddBudgetModal() {
        setBudgetFormZIndex(30);
    };

    function hideAddBudgetModal() {
        setBudgetFormZIndex(10);
    };

    useEffect(() => {
        CategoryService.getAllCategories()
                       .then(categories => setCategories(categories))
                       .catch(err => console.log(err.message));
    }, [someChange]);

    if (categories === null) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className = "relative z-0 h-full">
            <Categories categories = {categories} onAddExpenseClick = {showAddExpenseModal} onAddBudgetClick = {showAddBudgetModal} />
            <AddExpenseModal category = {addExpenseCategory} myZVal = {expenseFormZIndex} onCancelClick = {hideAddExpenseModal} toggleSomeChange = {toggleSomeChange} />
            <AddBudgetModal myZVal = {budgetFormZIndex} onCancelClick = {hideAddBudgetModal} toggleSomeChange = {toggleSomeChange} />
        </div>
    );
};

export default MainDisplayer;
