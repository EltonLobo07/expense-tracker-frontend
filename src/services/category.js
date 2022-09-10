import axios from "axios";

const BASE_URL = "http://localhost:3001/api/categories";

function getAllCategories() {
    return axios.get(`${BASE_URL}`)
                .then(response => response.data);
};

export default {getAllCategories}; 
