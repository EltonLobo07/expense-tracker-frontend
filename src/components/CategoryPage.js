import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Expense from "./ExpenseComponent";
import expenseService from "../services/expense";
import categoryService from "../services/category";
import DisplayError from "./DisplayError";

function CategoryPage() {
    const { categoryId } = useParams();
    const [expenses, setExpenses] = useState(null);
    const [category, setCategory] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const timeoutId = useRef(null);

    function setAndCloseErrDisplayer(err) {
        setErrMsg(err?.response?.data?.error || err.message);
        
        if (timeoutId.current !== null)
            clearInterval(timeoutId.current);

        timeoutId.current = setTimeout(() => setErrMsg(""), 5000);
    };

    useEffect(() => {
        expenseService.getOneCategoryExpenses({categoryId})
                      .then(expenses => setExpenses(expenses))
                      .catch(err => setAndCloseErrDisplayer(err));
    }, []);

    useEffect(() => {
        categoryService.getOneCategory(categoryId)
                       .then(category => setCategory(category))
                       .catch(err => setAndCloseErrDisplayer(err));
    }, []);

    if (expenses === null || category === null)
        return (
            <div className = "h-screen flex justify-center items-center bg-gray-50">
                <DisplayError msg = {errMsg} />

                <div className = "text-lg">
                    Loading...
                </div>
            </div>
        );

    const percentUsed = category.total / category.limit;

    function generateBarProgressColor() {
        if (percentUsed >= 0.75)
            return "#f44336"; // Same as tailwind red-500

        if (percentUsed >= 0.5)
            return "#ffeb3b"; // Same as tailwind yellow-500

        return "#4caf50"; // Same as tailwind green-500
    };

    return (
        <div className = "p-12 flex flex-col items-center gap-y-8 bg-gray-50 h-screen overflow-y-auto">
            <DisplayError msg = {errMsg} />
            
            <div className = "text-4xl my-sm:text-5xl font-semibold pb-2 capitalize">
                {category.name}
            </div>

            <div className = "flex flex-col items-center gap-y-4 py-4">
                <div>
                    <span className = "font-medium text-lg">
                        {`$${category.total}`}
                    </span>
                    <span className = "text-gray-500">
                        {` / $${category.limit}`}
                    </span> 
                </div>

                <div className = "w-full h-2 min-w-[300px] bg-gray-200 rounded-lg">
                    <div className = "h-full rounded-lg" style = {{
                        width: `${Math.min(100, percentUsed * 100)}%`,
                        backgroundColor: generateBarProgressColor()
                    }}>
                    </div>
                </div>

                {
                    expenses.length === 0 ?
                    (<div className = "text-lg">
                        No expenses
                    </div>) 
                    :
                    expenses.map(expense => <Expense key = {expense._id} expense = {expense} />)
                }
            </div>
        </div>
    );
};

export default CategoryPage;
