import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Expense from "./ExpenseComponent";
import expenseService from "../services/expense";
import categoryService from "../services/category";
import DisplayError from "./DisplayError";
import LoadingPage from "./LoadingPage";
import { dateToMyStr } from "../helpers";

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
    const { categoryId } = useParams();
    const [expenses, setExpenses] = useState(null);
    const [category, setCategory] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const [loadingPageMsg, setLoadingPageMsg] = useState("Loading...");
    const [startDate, setStartDate] = useState(() => dateToMyStr(new Date()));
    const [endDate, setEndDate] = useState(() => dateToMyStr(new Date()));
    const [radioBtnId, setRadioBtnId] = useState("none");
    const [sortReverse, setSortReverse] = useState(false);
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

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        categoryService.getOneCategory(categoryId)
                       .then(category => setCategory(category))
                       .catch(err => {
                            setAndCloseErrDisplayer(err);
                            setLoadingPageMsg("Something went wrong, please try again.");
                       });
    }, []);

    if (expenses === null || category === null)
        return <LoadingPage msg = {loadingPageMsg} errMsg = {errMsg} />;

    const percentUsed = category.total / category.limit;

    const orderedExpenses = orderExpenses(expenses, new Date(startDate).getTime(), new Date(endDate).getTime(), radioBtnId, sortReverse);

    return (
        <div className = "p-12 flex flex-col items-center gap-y-8 bg-gray-50 h-screen overflow-y-auto">
            <DisplayError msg = {errMsg} />
            
            <div className = "text-4xl my-sm:text-5xl font-semibold pb-2 capitalize">
                {category.name}
            </div>

            <div className = "flex flex-col items-center gap-y-4 py-4">
                <button onClick = {handleCategoryDeleteClick} className = "btn btn-v1 w-fit bg-red-600 border-red-600 hover:bg-red-700 active:bg-red-800">
                    Delete this category
                </button>

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

                    <div className = "flex gap-x-2 justify-center items-center">
                        <label htmlFor = "sortReverse" className = "text-lg font-medium">
                            Reverse sort
                        </label>
                        <input type = "checkbox" id = "sortReverse" checked = {sortReverse} onChange = {() => setSortReverse(!sortReverse)} />
                    </div>
                </div>

                {
                    orderedExpenses.length === 0 ?
                    (<div className = "text-lg">
                        No expenses
                    </div>) 
                    :
                    orderedExpenses.map(expense => <Expense key = {expense._id} expense = {expense} />)
                }
            </div>
        </div>
    );
};

export default CategoryPage;
