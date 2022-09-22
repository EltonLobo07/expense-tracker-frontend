import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import PromisePolyfill from "promise-polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import CategoryPage from "./components/CategoryPage";
import ExpensePage from "./components/ExpensePage";
import MainDisplayer from "./components/MainDisplayer";
import UnknownPath from "./components/UnknownPath";
import Login from "./components/Login";
import Signup from "./components/Signup";

if (!window.Promise)
    window.Promise = PromisePolyfill;

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<App />}>
                <Route index element = {<MainDisplayer />} />
                <Route path = "categories" element = {<MainDisplayer />} />
                <Route path = "categories/:categoryId" element = {<CategoryPage />} />
                <Route path = "expense-:expenseId" element = {<ExpensePage />} />

                <Route path = "login" element = {<Login />} />
                <Route path = "signup" element = {<Signup />} />
            </Route>
            <Route path = "*" element = {<UnknownPath />} />
        </Routes>
    </BrowserRouter>
);
