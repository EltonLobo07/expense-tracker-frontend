import axios from "axios";

const BASE_URL = "http://localhost:3001/api/expenses";

function getOneCategoryExpenses({ categoryId }, token) {
    return axios.get(`${BASE_URL}/category-${categoryId}`, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => response.data);
};

function getOneExpense({ expenseId }, token) {
    return axios.get(`${BASE_URL}/${expenseId}`, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    return response.data;
                });
};

function deleteOneExpense({ expenseId }, token) {
    return axios.delete(`${BASE_URL}/${expenseId}`, {headers: {Authorization: `Bearer ${token}`}});
};

function updateExpense(expenseId, data, token) {
    return axios.put(`${BASE_URL}/${expenseId}`, data, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => response.data)
};

function addExpense(data, token) {
    return axios.post(BASE_URL, data, {headers: {Authorization: `Bearer ${token}`}})
                 .then(response => response.data)
}

export default {getOneCategoryExpenses, getOneExpense, deleteOneExpense, updateExpense, addExpense}; 
