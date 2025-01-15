import axiosInstance from "./axiosConfig";

const taskApi = {
    create(planId: string, name: string){
        return axiosInstance.post("/task", {planId, name});
    },
    getAllForPlan(planId: string){
        const url = "/task?planId="+planId;
        return axiosInstance.get(url);
    }
}

export default taskApi;