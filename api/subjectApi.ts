import axiosInstance from "./axiosConfig";

const subjectApi = {
    getSubject(userId: string) {
        const url = "/subject?userId=" + userId;
        return axiosInstance.get(url);
    },
    

};

export default subjectApi;
