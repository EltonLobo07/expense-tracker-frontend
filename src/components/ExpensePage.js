import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import expenseService from "../services/expense";
import DisplayError from "./DisplayError";
import LoadingPage from "./LoadingPage";
import UnknownPath  from "./UnknownPath";
import { dateToMyStr, dateToDateFormatStr, toggleDisableAndFocusIfPossible } from "../helpers";

function ExpensePage() {
    const user = useOutletContext()[0];
    const addedDate = useRef(null);
    const [pageNotFound, setPageNotFound] = useState(false);
    const [description, setDescription] = useState(null);
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(null);
    const descriptionRef = useRef(null);
    const amountRef = useRef(null);
    const dateRef = useRef(null);
    const [editDescription, setEditDescription] = useState(false);
    const [editAmount, setEditAmount] = useState(false);
    const [editDate, setEditDate] = useState(false);
    const [category, setCategory] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const timeoutId = useRef(null);
    const [loadingPageMsg, setLoadingPageMsg] = useState("Loading...");
    const { expenseId } = useParams(); 
    const navigate = useNavigate();

    function setAndCloseErrDisplayer(err) {
        setErrMsg(err?.response?.data?.error || err.message);
        
        if (timeoutId.current !== null)
            clearInterval(timeoutId.current);

        timeoutId.current = setTimeout(() => setErrMsg(""), 5000);
    };

    useEffect(() => {
        if (user === null) {
            navigate("/login");
            return;
        }

        expenseService.getOneExpense({expenseId})
                      .then(expense => {
                        addedDate.current = new Date(expense.added);
                        setDate(dateToMyStr(new Date(expense.date)));
                        setDescription(expense.description);
                        setAmount(expense.amount);
                        setCategory(expense.category);
                      })
                      .catch(err => {
                        if (err.response?.status === 404)
                            setPageNotFound(true);
                        else {
                            setAndCloseErrDisplayer(err);
                            setLoadingPageMsg("Something went wrong, please try again.");
                        }
                      });
    }, [user]);

    function handleDeleteButtonClick() {
        expenseService.deleteOneExpense({expenseId})
                      .then(() => navigate(`/categories/${category._id}`))
                      .catch(err => setAndCloseErrDisplayer(err));
    };

    if (pageNotFound)
        return <UnknownPath />

    if (addedDate.current === null) 
        return <LoadingPage msg = {loadingPageMsg} errMsg = {errMsg} />

    async function handleDescriptionEditClick() {
        toggleDisableAndFocusIfPossible(descriptionRef);

        if (editDescription) {
            try {
                setDescription((await expenseService.updateExpense(expenseId, {description})).description);
            }
            catch (err) {
                setAndCloseErrDisplayer(err);
                toggleDisableAndFocusIfPossible(descriptionRef);
                return;
            }
        }

        setEditDescription(!editDescription);  
    };

    async function handleAmountEditClick() {
        toggleDisableAndFocusIfPossible(amountRef);

        if (editAmount) {
            try {
                setAmount((await expenseService.updateExpense(expenseId, {amount: Number(amount)})).amount);
            }
            catch (err) {
                setAndCloseErrDisplayer(err);
                toggleDisableAndFocusIfPossible(amountRef);
                return;
            }
        }

        setEditAmount(!editAmount);  
    };

    async function handleDateEditClick() {
        toggleDisableAndFocusIfPossible(dateRef);

        if (editDate) {
            try {
                setDate(dateToMyStr(new Date((await expenseService.updateExpense(expenseId, {date})).date)));
            }
            catch (err) {
                setAndCloseErrDisplayer(err);
                toggleDisableAndFocusIfPossible(dateRef);
                return;
            }
        }

        setEditDate(!editDate);  
    };

    return (
        <div className = "flex justify-center bg-gray-50 pb-8 overflow-y-auto" style = {{height: "calc(100vh - 115px)"}}>
            <DisplayError msg = {errMsg} />

            <div className = "mx-4 my-8 w-full max-w-lg flex flex-col gap-y-4 p-6 rounded-md bg-white h-fit">
                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "description" className = "text-lg font-medium flex gap-x-1">
                        <span>
                            Description
                        </span>

                        {
                            editDescription ? 
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" strokeWidth="32" stroke="currentColor" className = "w-6 h-6 stroke-blue-700" onClick = {handleDescriptionEditClick}>
                                    <title>Save</title>
                                    <path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )
                            :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-blue-700" onClick = {handleDescriptionEditClick}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            )
                        }
                    </label>

                    <textarea id = "description" rows = {2} className = "p-1 resize-y min-h-[32px] bg-gray-50" disabled = {!editDescription} value = {description} onChange = {e => setDescription(e.target.value)} ref = {descriptionRef}>
                    </textarea>
                </div>

                <div className = "flex flex-col gap-y-1">
                    <label htmlFor = "amount" className = "text-lg font-medium flex gap-x-1">
                        <span>
                            Amount
                        </span>

                        {
                            editAmount ? 
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" strokeWidth="32" stroke="currentColor" className = "w-6 h-6 stroke-blue-700" onClick = {handleAmountEditClick}>
                                    <title>Save</title>
                                    <path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )
                            :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-blue-700" onClick = {handleAmountEditClick}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            )
                        }
                    </label>
                    <input id = "amount" type = "number" className = "p-1 bg-gray-50" disabled = {!editAmount} value = {amount} onChange = {e => setAmount(e.target.value)} ref = {amountRef} />
                </div>

                <div className = "flex flex-col gap-y-1">
                    <div className = "text-lg font-medium flex gap-x-1">
                        <span>
                            Date
                        </span>

                        {
                            editDate ? 
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" strokeWidth="32" stroke="currentColor" className = "w-6 h-6 stroke-blue-700" onClick = {handleDateEditClick}>
                                    <title>Save</title>
                                    <path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )
                            :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-blue-700" onClick = {handleDateEditClick}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            )
                        }                    
                    </div>
                    <input type = "date" disabled = {!editDate} value = {date} onChange = {e => setDate(e.target.value)} className = "p-1 bg-gray-50" ref = {dateRef} />
                </div>


                <div className = "flex flex-col gap-y-1">
                    <div className = "text-lg font-medium">
                        Added on
                    </div>
                    <div>
                        {dateToDateFormatStr(new Date(addedDate.current.getTime() - (new Date().getTimezoneOffset() * 60000)))}
                    </div>
                </div>

                <div>
                    <div className = "text-lg font-medium">
                        Category Name
                    </div>
                    <div className = "capitalize">
                        {category.name}
                    </div>
                </div>

                <button className = "btn btn-v1 w-fit bg-red-600 border-red-600 hover:bg-red-700 active:bg-red-800" onClick = {handleDeleteButtonClick}>
                    Delete Expense
                </button>
            </div>
        </div>
    );
};

export default ExpensePage;
