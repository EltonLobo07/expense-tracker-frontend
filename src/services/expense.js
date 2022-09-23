import axios from "axios";
import { token } from "./token";
const config = {headers: {Authorization: `Bearer ${token}`}};

const BASE_URL = "http://localhost:3001/api/expenses";

function getOneCategoryExpenses({ categoryId }) {
    return axios.get(`${BASE_URL}/category-${categoryId}`, config)
                .then(response => response.data);
};

function getOneExpense({ expenseId }) {
    return axios.get(`${BASE_URL}/${expenseId}`, config)
                .then(response => {
                    return response.data;
                });
};

function deleteOneExpense({ expenseId }) {
    return axios.delete(`${BASE_URL}/${expenseId}`, config);
};

function updateExpense(expenseId, data) {
    return axios.put(`${BASE_URL}/${expenseId}`, data, config)
                .then(response => response.data)
};

function addExpense(data) {
    return axios.post(BASE_URL, data, config)
                 .then(response => response.data)
}

export default {getOneCategoryExpenses, getOneExpense, deleteOneExpense, updateExpense, addExpense}; 
