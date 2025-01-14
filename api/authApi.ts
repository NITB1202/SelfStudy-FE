import axiosInstance from "./axiosConfig";

const authApi = {
    login: (email: string, password: string) => {
        return axiosInstance.post("/auth/login", {email, password});
    },
    sendCode: (email: string) => {
        const url = "/auth/mail?email="+email;
        return axiosInstance.get(url);
    }
}

export default authApi;