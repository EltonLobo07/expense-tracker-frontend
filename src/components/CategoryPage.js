import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Expense from "./ExpenseComponent";
import expenseService from "../services/expense";
import categoryService from "../services/category";

function CategoryPage() {
    const { categoryId } = useParams();
    const [expenses, setExpenses] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        expenseService.getOneCategoryExpenses({categoryId})
                      .then(expenses => setExpenses(expenses))
                      .catch(err => console.log(err.message));
    }, []);

    useEffect(() => {
        categoryService.getOneCategory(categoryId)
                       .then(category => setCategory(category))
                       .catch(err => console.log(err.message));
    }, []);

    if (expenses === null || category === null)
        return (
            <div>Loading...</div>
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
