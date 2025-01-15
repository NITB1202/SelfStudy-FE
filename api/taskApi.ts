import axiosInstance from "./axiosConfig";

const taskApi = {
    create(planId: string, name: string){
        return axiosInstance.post("/task", {planId, name});
    }
}

export default taskApi;