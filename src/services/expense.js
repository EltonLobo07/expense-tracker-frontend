import axios from "axios";

const BASE_URL = "http://localhost:3001/api/expenses";

function getOneCategoryExpenses({ categoryId }) {
    return axios.get(`${BASE_URL}/category-${categoryId}`)
                .then(response => response.data);
};

function getOneExpense({ expenseId }) {
    return axios.get(`${BASE_URL}/${expenseId}`)
                .then(response => response.data);
};

function deleteOneExpense({ expenseId }) {
    return axios.delete(`${BASE_URL}/${expenseId}`);
};

function updateExpense(data) {
    return axios.put(`${BASE_URL}/${this}`, data)
                .then(response => response.data)
}

export default {getOneCategoryExpenses, getOneExpense, deleteOneExpense, updateExpense}; 
