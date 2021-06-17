import axiosClient from "./axiosClient";
export const apiStudent = {
    getTimetableStudent: (params: IParamTimeTableStudent) => {
        const url = "/timetables/student/";
        return axiosClient.get(url + params.userId + '/' + params.year + '/' + params.semester);
    },
    getListStudent: () => {
        const url = "/users/students";
        return axiosClient.get(url);
    },
    getOneStudent: (id: string) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },
    putUpdateStudent: (params: IParamStudent) => {
        const url = '/users';
        return axiosClient.put(url, params);
    },
    postAddStudent: (params: IParamStudent) => {
        const url = '/users';
        return axiosClient.post(url, params);
    },
    postAddTimetable: (params: File) => {
        const url = '/excel/timetables';
        return axiosClient.post(url, params);
    }
}