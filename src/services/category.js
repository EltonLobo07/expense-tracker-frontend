import axios from "axios";
import { token } from "./token";
const config = {headers: {Authorization: `Bearer ${token}`}};

const BASE_URL = "http://localhost:3001/api/categories";

function getAllCategories() {
    return axios.get(BASE_URL, config)
                .then(response => response.data);
};

function addCategory(data) {
    return axios.post(BASE_URL, data, config)
                .then(response => response.data);
};

function getOneCategory(categoryId) {
    return axios.get(`${BASE_URL}/${categoryId}`, config)
                .then(response => response.data);
};

function deleteOneCategoryAndAllRelatedExpenses(categoryId) {
    return axios.delete(`${BASE_URL}/${categoryId}`, config)
                .then(response => response.data);
};

function updateOneCategory(categoryId, updatedCategoryObj) {
    return axios.put(`${BASE_URL}/${categoryId}`, updatedCategoryObj, config)
                .then(response => response.data);
};

export default {getAllCategories, addCategory, getOneCategory, deleteOneCategoryAndAllRelatedExpenses, updateOneCategory}; 
