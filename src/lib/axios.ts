import axios from "axios";

const instance = axios.create({
    baseURL: "/api",
    withCredentials: true, // send cookies automatically
});

export default instance;
