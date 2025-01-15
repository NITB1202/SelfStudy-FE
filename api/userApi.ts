import axiosInstance from "./axiosConfig";

const userApi = {
    register(username: string, email: string, password: string){
        return axiosInstance.post("/user", { email, username, password, role: "USER" });
    },
    getById(id: string){
        const url = "/user?id="+id;
        return axiosInstance.get(url);
    }
}
export default userApi;