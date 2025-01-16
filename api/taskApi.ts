import axiosInstance from "./axiosConfig";

const taskApi = {
    create(planId: string, name: string){
        return axiosInstance.post("/task", {planId, name});
    },
    getAllForPlan(planId: string){
        const url = "/task?planId="+planId;
        return axiosInstance.get(url);
    },
    update(taskId: string, name: string, status: string){
        return axiosInstance.patch("/task", {taskId, name, status});
    },
    delete(taskId: string){
        const url = "/task?taskId="+taskId;
        return axiosInstance.delete(url);
    }
}

export default taskApi;