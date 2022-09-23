import axios from "axios";
import { token } from "./token";
const config = {headers: {Authorization: `Bearer ${token}`}};

const BASE_URL = "http://localhost:3001/api/users";

function signup(data) {
    return axios.post(BASE_URL, data, config)
                .then(response => response.data);
};

export default {signup};
