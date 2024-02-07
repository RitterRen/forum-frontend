// This file is use to save all the api address.

const API = {
    register: "http://localhost:8888/api/auth/register",
    
    login: "http://localhost:8888/api/auth/login",
    
    getUserInfo: "http://localhost:8888/api/user",

    getAllUsers: "http://localhost:8888/api/user/all",

    refreshToken: "http://localhost:8888/api/auth/refreshtoken"
};

export const STATUS = {
    SUCCESS: "0000",
    INVALID_CREDENTIALS: "0006",
}

export const apiRequest = (url: string, options:any) => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/signIn";
        return;
    }

    const headers = new Headers(options.headers || {});
    headers.append("Authorization", `Bearer ${token}`);

    const updatedOptions = {...options, headers};

    return fetch(url, updatedOptions);
}

export default API;