import axios from "axios";

// export const BASE_URL = "http://localhost:5000/api";
export const BASE_URL = "https://machineecommerce-backend.onrender.com/api";

const TOKEN =localStorage.getItem("persist:root") ==null ?"" : JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken
console.log(TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token : `Bearer ${TOKEN}`},
});