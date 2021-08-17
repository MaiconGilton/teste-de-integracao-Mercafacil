import axios from "axios"
import { getToken } from "./auth";

export const API_URL = process.env.REACT_APP_API

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(async config => {
    const token = getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

api.interceptors.response.use(
    response => {
        if (response.data.error)
            response.data = { error: response.data.error }

        return response
    },
    error => {
        return { error: error.message }
    }
)
export default api