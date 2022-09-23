import axios from "axios";

const BASE_URL = "http://localhost:3001/api/users";

function signup(data) {
    return axios.post(BASE_URL, data)
                .then(response => response.data);
};

export default {signup};
