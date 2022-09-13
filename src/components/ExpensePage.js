import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import expenseService from "../services/expense";
import UnknownPath  from "./UnknownPath";

function ExpensePage() {
    const expenseDates = useRef(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [edit, setEdit] = useState(false);
    const { expenseId } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        expenseService.getOneExpense({expenseId})
                      .then(expense => {
                        expenseDates.current = {date: new Date(expense.date), added: new Date(expense.added)};
                        setDescription(expense.description);
                        setAmount(expense.amount);
                      })
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

    if (expenseDates.current === null) 
        return (
            <div>
                Loading...
            </div>
        );

    async function toggleEdit() {
        if (edit) {
            // edit was true but now it will be set to false
            try {
                await expenseService.updateExpense(expenseId, {description, amount: Number(amount)});
            }
            catch(err) {
                console.log(err.message);
            }
        }

        setEdit(!edit);
    };

    const expenseDate = expenseDates.current.date;
    const expenseAdded = expenseDates.current.added; 

    return (
        <div className = "flex justify-center h-screen bg-gray-50">
            <div className = "mx-4 my-8 w-full max-w-lg flex flex-col gap-y-8 p-6 rounded-md bg-white overflow-y-auto">
                <button className = "btn btn-v1 self-center" onClick = {toggleEdit}>
                    {`${edit ? "Save" : "Edit"} expense`}
                </button>
                
                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "description" className = "text-lg font-medium">
                        Description
                    </label>
                    <textarea id = "description" value = {description} onChange = {e => {setDescription(e.target.value)}} rows = {3} className = "p-1 resize-y min-h-[32px] bg-gray-50" disabled = {!edit}>
                    </textarea>
                </div>

                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "amount" className = "text-lg font-medium">
                        Amount
                    </label>
                    <input id = "amount" type = "number" value = {amount} onChange = {e => setAmount(e.target.value)} className = "p-1 bg-gray-50" disabled = {!edit} />
                </div>

                <div className = "flex flex-col gap-y-1">
                    <div className = "text-lg font-medium">
                        Date
                    </div>
                    <div>
                        {`${String(expenseDate.getDate()).padStart(2, "0")}/${String(expenseDate.getMonth() + 1).padStart(2, "0")}/${expenseDate.getFullYear()}`}
                    </div>
                </div>


                <div className = "flex flex-col gap-y-1">
                    <div className = "text-lg font-medium">
                        Added on
                    </div>
                    <div>
                        {`${String(expenseAdded.getDate()).padStart(2, "0")}/${String(expenseAdded.getMonth() + 1).padStart(2, "0")}/${expenseAdded.getFullYear()}`}
                    </div>
                </div>

                <button className = "btn btn-v1 w-fit" onClick = {handleDeleteButtonClick}>
                    Delete Expense
                </button>
            </div>
        </div>
    );
};

export default ExpensePage;
