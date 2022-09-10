import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Expense from "./ExpenseComponent";
import expenseService from "../services/expense";

function CategoryPage() {
    const { categoryId } = useParams();
    const [expenses, setExpenses] = useState(null);

    useEffect(() => {
        expenseService.getOneCategoryExpenses({categoryId})
                      .then(expenses => setExpenses(expenses))
                      .catch(err => console.log(err.message));
    }, []);

    if (expenses === null)
        return (
            <div>Loading...</div>
        );

    return (
        <div>
            {
                expenses.map(expense => <Expense key = {expense._id} expense = {expense} />)
            }
        </div>
    );
};

export default CategoryPage;
