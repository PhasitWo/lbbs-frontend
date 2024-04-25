// GET http://127.0.0.1:8000/book/0
import axios from "axios";
import { useGlobalContext } from "./context";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

const api_with_auth = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

api_with_auth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {api_with_auth, api}
