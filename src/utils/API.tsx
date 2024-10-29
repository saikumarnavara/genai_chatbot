import axios from "axios";

const GEMINI_API_ENDPOINT = axios.create({
    baseURL: "http://127.0.0.1:8000"
    // baseURL: "XXXXXXXXXXXXXXXXXXXXXX"
});

export { GEMINI_API_ENDPOINT}