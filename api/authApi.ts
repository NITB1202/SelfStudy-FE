import axiosInstance from "./axiosConfig";

const authApi = {
    login(email: string, password: string){
        return axiosInstance.post("/auth/login", {email, password});
    },
    sendCode(email: any){
        const url = "/auth/mail?email="+email;
        return axiosInstance.get(url);
    },
    verify(email: string, code: string){
        return axiosInstance.post("/auth/verify", {email, code});
    },
    resetPassword(email: string, password: string){
        return axiosInstance.post("/auth/reset", {email,password});
    }
}

export default authApi;