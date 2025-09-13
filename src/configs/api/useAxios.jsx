import axios from 'axios';

export default function useAxios() {
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BASEURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return axiosInstance;
}
