import axiosInstance from "./axiosConfig";

const authApi = {
    login: (email: string, password: string) => {
        return axiosInstance.post("/auth/login", {email, password});
    },
}

export default authApi;