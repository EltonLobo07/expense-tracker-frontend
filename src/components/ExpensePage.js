import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateDBInput from "./UpdateDBInput";
import expenseService from "../services/expense";
import UnknownPath  from "./UnknownPath";

function ExpensePage() {
    const [expense, setExpense] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const { expenseId } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        expenseService.getOneExpense({expenseId})
                      .then(expense => setExpense(expense))
                      .catch(err => {
                        if (err.response.status === 404)
                            setPageNotFound(true);
                      });
    }, []);

    function handleDeleteButtonClick() {
        expenseService.deleteOneExpense({expenseId})
                      .then(() => navigate(`/category/${expense.category}`))
                      .catch(err => console.log(err.message));
    };

    if (pageNotFound)
        return <UnknownPath />

    if (expense === null) 
        return (
            <div>
                Loading...
            </div>
        );

    const updateExpense = expenseService.updateExpense.bind(expenseId);

    return (
        <div className = "border border-green-300 flex flex-col gap-y-2 p-2">
            <UpdateDBInput initialValue = {expense.description} valueName = "description" service = {updateExpense} inputType = "textarea" inputId = "description" />

            <UpdateDBInput initialValue = {expense.amount} valueName = "amount" service = {updateExpense} inputType = "number" inputId = "amount" textBeforeInput = "$" />

            <div>
                Date: {expense.date}
            </div>

            <div>
                Added on: {expense.added}
            </div>

            <button className = "btn btn-v1 w-fit" onClick = {handleDeleteButtonClick}>
                Delete Expense
            </button>
        </div>
    );
};

export default ExpensePage;
