import axios from "axios";

export const api_conn = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
})
