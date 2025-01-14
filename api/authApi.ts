import axiosInstance from "./axiosConfig";

const authApi = {
    login: (email: string, password: string) => {
        return axiosInstance.post("/auth/login", {email, password});
    },
    sendCode: (email: any) => {
        const url = "/auth/mail?email="+email;
        return axiosInstance.get(url);
    },
    verify: (email: string, code: string) =>{
        return axiosInstance.post("/auth/verify", {email, code});
    }
}

export default authApi;