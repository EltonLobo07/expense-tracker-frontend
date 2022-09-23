import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Expense from "./ExpenseComponent";
import expenseService from "../services/expense";
import categoryService from "../services/category";
import DisplayError from "./DisplayError";
import LoadingPage from "./LoadingPage";
import { dateToMyStr, toggleDisableAndFocusIfPossible } from "../helpers";

function generateBarProgressColor(percentUsed) {
    if (percentUsed >= 0.75)
        return "#f44336"; // Same as tailwind red-500

    if (percentUsed >= 0.5)
        return "#ffeb3b"; // Same as tailwind yellow-500

    return "#4caf50"; // Same as tailwind green-500
};

function orderExpenses(expenses, startTime, endTime, radioBtnId, sortReverse) {
    const filteredExpenses = expenses.filter(expense => {
        const curTime = new Date(expense.date).getTime();
        return curTime >= startTime && curTime <= endTime;  
    });

    if (radioBtnId === "none")
        return filteredExpenses;

    const mul = sortReverse ? -1 : 1;

    if (radioBtnId === "sortByDate") {
        filteredExpenses.sort((exp1, exp2) => {
            const curTime1= new Date(exp1.date).getTime()
            const curTime2 = new Date(exp2.date).getTime(); 
            return mul * (curTime1 - curTime2);
        });
    }
    else {
        filteredExpenses.sort((exp1, exp2) => mul* (exp1.amount - exp2.amount));
    }

    return filteredExpenses;
};



function CategoryPage() {
    const user = useOutletContext()[0];
    const { categoryId } = useParams();
    const [expenses, setExpenses] = useState(null);
    const [category, setCategory] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const [loadingPageMsg, setLoadingPageMsg] = useState("Loading...");
    const [startDate, setStartDate] = useState(() => dateToMyStr(new Date()));
    const [endDate, setEndDate] = useState(() => dateToMyStr(new Date()));
    const [radioBtnId, setRadioBtnId] = useState("none");
    const [sortReverse, setSortReverse] = useState(false);
    const [editCategoryName, setEditCategoryName] = useState(false);
    const [editCategoryLimit, setEditCategoryLimit] = useState(false);
    const categoryNameRef = useRef(null);
    const categoryLimitRef = useRef(null);
    const timeoutId = useRef(null);
    const navigate = useNavigate();

    function setAndCloseErrDisplayer(err) {
        setErrMsg(err?.response?.data?.error || err.message);
        
        if (timeoutId.current !== null)
            clearInterval(timeoutId.current);

        timeoutId.current = setTimeout(() => setErrMsg(""), 5000);
    };

    async function handleCategoryDeleteClick() {
        if (window.confirm(`Deleting this category will delete all of the expenses related to this category. If you wish to proceed, click "ok"`)) {
            try {
                await categoryService.deleteOneCategoryAndAllRelatedExpenses(categoryId);
                navigate("/categories");
            }
            catch(err) {
                setAndCloseErrDisplayer(err);
            }
        }
    };

    async function handleExpenseDeleteClick(e) {
        if (e.target.dataset?.cancel === "yes") {
            try {
                const expenseId = e.target.dataset.expenseid;
                await expenseService.deleteOneExpense({expenseId: expenseId});
                setExpenses(expenses.filter(expense => expense._id !== expenseId));
            }
            catch(err) {
                setAndCloseErrDisplayer(err);
            }
        }
    };

    useEffect(() => {
        if (user) {
            expenseService.getOneCategoryExpenses({categoryId})
                      .then(expenses => {
                            let mn = Infinity;

                            for (let i = 0; i < expenses.length; i++) {
                                mn = Math.min(mn, new Date(expenses[i].date).getTime());
                            }

                            if (Number.isFinite(mn))
                                setStartDate(dateToMyStr(new Date(mn)));

                            setExpenses(expenses);
                      })
                      .catch(err => {
                            setAndCloseErrDisplayer(err);
                            setLoadingPageMsg("Something went wrong, please try again");
                      });
        }
    }, []);

    useEffect(() => {
        if (user) {
            categoryService.getOneCategory(categoryId)
                       .then(category => setCategory(category))
                       .catch(err => {
                            setAndCloseErrDisplayer(err);
                            setLoadingPageMsg("Something went wrong, please try again.");
                       });
        }
    }, [expenses]);

    useEffect(() => {
        if (user === null)
            navigate("/login");
    }, [user]);

    if (expenses === null || category === null)
        return <LoadingPage msg = {loadingPageMsg} errMsg = {errMsg} />;

    async function handleCategoryNameEditClick() {
        toggleDisableAndFocusIfPossible(categoryNameRef);

        if (editCategoryName) {
            try {
                setCategory(await categoryService.updateOneCategory(category._id, {name: categoryNameRef.current.value}));
            }
            catch (err) {
                setAndCloseErrDisplayer(err);
                toggleDisableAndFocusIfPossible(categoryNameRef);
                return;
            }
        }

        setEditCategoryName(!editCategoryName);  
    };

    async function handleCategoryLimitEditClick() {
        console.log("Function called");
        toggleDisableAndFocusIfPossible(categoryLimitRef);

        if (editCategoryLimit) {
            try {
                setCategory(await categoryService.updateOneCategory(category._id, {limit: Number(categoryLimitRef.current.value)}));
            }
            catch (err) {
                setAndCloseErrDisplayer(err);
                toggleDisableAndFocusIfPossible(categoryLimitRef);
                return;
            }
        }

        setEditCategoryLimit(!editCategoryLimit);  
    };

    const percentUsed = category.total / category.limit;

    const orderedExpenses = orderExpenses(expenses, new Date(startDate).getTime(), new Date(endDate).getTime(), radioBtnId, sortReverse);

    return (
        <div className = "p-12 flex flex-col items-center gap-y-8 bg-gray-50 overflow-y-auto" style = {{height: "calc(100vh - 115px)"}}>
            <DisplayError msg = {errMsg} />
            
            <div className = "flex flex-col items-center gap-y-1">
                {
                    editCategoryName ? 
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" strokeWidth="32" stroke="currentColor" className = "w-6 h-6 stroke-blue-700" onClick = {handleCategoryNameEditClick}>
                            <title>Save</title>
                            <path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )
                    :
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-blue-700" onClick = {handleCategoryNameEditClick}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    )
                }

                <textarea className = "text-4xl my-sm:text-5xl font-semibold p-1 text-center w-full min-w-[300px] min-h-[56px]" disabled = {!editCategoryName} defaultValue = {category.name} ref = {categoryNameRef}>
                </textarea>
            </div>

            <div className = "flex flex-col items-center gap-y-4 py-4">
                <button onClick = {handleCategoryDeleteClick} className = "btn btn-v1 w-fit bg-red-600 border-red-600 hover:bg-red-700 active:bg-red-800">
                    Delete this category
                </button>

                <div className = "flex flex-col gap-y-1 text-lg">
                    <div className = 'flex gap-x-2'>
                        <span>
                            Used
                        </span>
                        
                        <span className = "font-medium">
                            {`$ ${category.total}`}
                        </span>
                    </div>
                    
                    <div className = "flex gap-x-2 items-center">
                        <label htmlFor = "limit" className = "text-lg">
                            Limit
                        </label>
                        <span>
                            $ <input type = "number" id = "limit"  defaultValue = {category.limit} className = "w-24 p-1 text-lg" disabled = {!editCategoryLimit} ref = {categoryLimitRef} />
                        </span>
                        {
                            editCategoryLimit ? 
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" strokeWidth="32" stroke="currentColor" className = "w-6 h-6 stroke-blue-700" onClick = {handleCategoryLimitEditClick}>
                                    <title>Save</title>
                                    <path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )
                            :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-blue-700" onClick = {handleCategoryLimitEditClick}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            )
                        }
                    </div>
                </div>

                <div className = "w-full h-2 min-w-[300px] bg-gray-200 rounded-lg">
                    <div className = "h-full rounded-lg" style = {{
                        width: `${Math.min(100, percentUsed * 100)}%`,
                        backgroundColor: generateBarProgressColor(percentUsed)
                    }}>
                    </div>
                </div>

                <div className = "flex flex-col gap-y-2 min-w-[300px]">
                    <div className = "flex my-xsm:flex-row my-xsm:gap-x-4 flex-col gap-y-4">
                        <div className = "flex flex-col gap-y-1">
                            <label htmlFor = "startDate" className = "text-lg font-medium">
                                Start Date
                            </label>
                            <input id = "startDate" type = "date" value = {startDate} onChange = {e => setStartDate(e.target.value)} style = {{border: "1px solid black"}} />
                        </div>

                        <div className = "flex flex-col gap-y-1">
                            <label htmlFor = "endDate" className = "text-lg font-medium">
                                End Date
                            </label>
                            <input id = "endDate" type = "date" value = {endDate} onChange = {e => setEndDate(e.target.value)} style = {{border: "1px solid black"}} />
                        </div>
                    </div>

                    <fieldset className = "flex justify-around border border-black bg-white p-1" onChange = {e => setRadioBtnId(e.target.id)}>
                        <legend className = "text-lg font-medium">
                            Sort
                        </legend>

                        <div className = "flex justify-center items-center gap-x-1">
                            <input type = "radio" name = "sortBy" id = "none" defaultChecked />
                            <label htmlFor = "none">
                                None
                            </label>
                        </div>
                        
                        <div className = "flex justify-center items-center gap-x-1">
                            <input type = "radio" name = "sortBy" id = "amount" />
                            <label htmlFor = "amount">
                                Amount
                            </label>
                        </div>

                        <div className = "flex justify-center items-center gap-x-1">
                            <input type = "radio" name = "sortBy" id = "sortByDate" />
                            <label htmlFor = "sortByDate">
                                Date
                            </label>
                        </div>
                    </fieldset>

                    <div className = "flex flex-col gap-y-1 justify-center items-center">
                        <label htmlFor = "sortReverse" className = "text-lg font-medium">
                            Sort order (decreasing)
                        </label>
                        <input type = "checkbox" id = "sortReverse" checked = {sortReverse} onChange = {() => setSortReverse(!sortReverse)} />
                    </div>
                </div>

                {
                    orderedExpenses.length === 0 ?
                    (
                        <div className = "text-lg">
                            No expenses
                        </div>
                    ) 
                    :
                    (
                        <div className = "flex flex-col gap-y-4" onClick = {handleExpenseDeleteClick}>
                            {orderedExpenses.map(expense => <Expense key = {expense._id} expense = {expense} />)}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CategoryPage;
