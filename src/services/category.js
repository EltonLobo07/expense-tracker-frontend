import axios from "axios";

const BASE_URL = "http://localhost:3001/api/categories";

function getAllCategories() {
    return axios.get(BASE_URL)
                .then(response => response.data);
};

function addCategory(data) {
    return axios.post(BASE_URL, data)
                .then(response => response.data);
};

function getOneCategory(categoryId) {
    return axios.get(`${BASE_URL}/${categoryId}`)
                .then(response => response.data);
};

export default {getAllCategories, addCategory, getOneCategory}; 
