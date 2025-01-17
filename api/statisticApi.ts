import axiosInstance from "./axiosConfig";

const statisticApi = {
    getHoursSpent(userId: string) {
        const url = "/statistic/hour?userId=" + userId;
        return axiosInstance.get(url);
    },
    getFinish(userId: string) {
        const url = "/statistic/finish?userId=" + userId;
        return axiosInstance.get(url);
    },
    getFinishRate(userId: string) {
        const url = "/statistic/finish-rate?userId=" + userId;
        return axiosInstance.get(url);
    },
    getFinishSession(userId: string) {
        const url = "/statistic/finish-session?userId=" + userId;
        return axiosInstance.get(url);
    },

};

export default statisticApi;
