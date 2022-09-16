import React, { useEffect, useState, useRef } from "react";
import CategoryService from "../services/category";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import Categories from "./Categories";
import DisplayError from "./DisplayError";
import LoadingPage from "./LoadingPage";

function MainDisplayer() {
    const [categories, setCategories] = useState(null);
    const [expenseFormZIndex, setExpenseFormZIndex] = useState(10);
    const [addExpenseCategory, setAddExpenseCategory] = useState(null);
    const [budgetFormZIndex, setBudgetFormZIndex] = useState(10);
    const [errMsg, setErrMsg] = useState("");
    const [loadingPageMsg, setLoadingPageMsg] = useState("Loading...");
    const timeoutId = useRef(null);

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

    function setAndCloseErrDisplayer(err) {
        setErrMsg(err?.response?.data?.error || err.message);
        
        if (timeoutId.current !== null)
            clearInterval(timeoutId.current);

        timeoutId.current = setTimeout(() => setErrMsg(""), 5000);
    };

    useEffect(() => {
        CategoryService.getAllCategories()
                       .then(categories => setCategories(categories))
                       .catch(err => {
                            setAndCloseErrDisplayer(err);
                            setLoadingPageMsg("Something went wrong, please try again.");
                       });
    }, []);

    if (categories === null) {
        return <LoadingPage msg = {loadingPageMsg} errMsg = {errMsg} />;
    }

    return (
        <div className = "relative z-0 h-screen">
            <DisplayError msg = {errMsg} />

            <Categories categories = {categories}
                        onAddExpenseClick = {showAddExpenseModal} 
                        onAddBudgetClick = {showAddBudgetModal} />

            <AddExpenseModal myZVal = {expenseFormZIndex} 
                             onCancelClick = {hideAddExpenseModal} 
                             categories = {categories} 
                             setCategories = {setCategories} 
                             categoryName = {addExpenseCategory} 
                             setExpenseFormZIndex = {setExpenseFormZIndex}
                             setAndCloseErrDisplayer = {setAndCloseErrDisplayer} />

            <AddBudgetModal myZVal = {budgetFormZIndex} 
                            onCancelClick = {hideAddBudgetModal} 
                            categories = {categories} 
                            setCategories = {setCategories} 
                            setBudgetFormZIndex = {setBudgetFormZIndex}
                            setAndCloseErrDisplayer = {setAndCloseErrDisplayer} />
        </div>
    );
};

export default MainDisplayer;
