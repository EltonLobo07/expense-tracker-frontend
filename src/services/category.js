import axios from "axios";

const BASE_URL = "/api/categories"; // "http://localhost:3001/api/categories";

function getAllCategories(token) {
    return axios.get(BASE_URL, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => response.data);
};

function addCategory(data, token) {
    return axios.post(BASE_URL, data, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => response.data);
};

function getOneCategory(categoryId, token) {
    return axios.get(`${BASE_URL}/${categoryId}`, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => response.data);
};

function deleteOneCategoryAndAllRelatedExpenses(categoryId, token) {
    return axios.delete(`${BASE_URL}/${categoryId}`, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => response.data);
};

function updateOneCategory(categoryId, updatedCategoryObj, token) {
    return axios.put(`${BASE_URL}/${categoryId}`, updatedCategoryObj, {headers: {Authorization: `Bearer ${token}`}})
                .then(response => response.data);
};

export default {getAllCategories, addCategory, getOneCategory, deleteOneCategoryAndAllRelatedExpenses, updateOneCategory}; 
