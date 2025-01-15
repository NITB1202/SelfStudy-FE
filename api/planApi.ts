import axiosInstance from "./axiosConfig";

const planApi = {
    getDateHasDeadlineUser(userId: string, month: number, year: number){
        const url = "/plan/month?userId=" + userId + "&month=" + month + "&year=" + year;
        return axiosInstance.get(url);
    },
    getUserPlansOnDate(id: string, date: string){
        const url = "/plan/date?id=" + id + "&date=" + date;
        return axiosInstance.get(url);
    },
    create(userId: string, name: string, description: string, startDate: string, endDate: string, notifyBefore: string){
        return axiosInstance.post("/plan",{userId, name, description, startDate, endDate, notifyBefore });
    },
};

export default planApi;
