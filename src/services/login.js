import axios from "axios";

const BASE_URL = "/api/login"; // "http://localhost:3001/api/login";

function login(data) {
    return axios.post(BASE_URL, data)
                .then(response => response.data);
};

export default {login};
