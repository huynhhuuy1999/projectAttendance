import axiosClient from "./axiosClient";
export const apiCourse = {
    getListCourse: () => {
        const url = "/courses";
        return axiosClient.get(url);
    },
    postAddCourse: (params: IParamCreateCourse) => {
        const url = '/courses';
        return axiosClient.post(url, params);
    },
    putUpdateCourse: (params: IParamCreateCourse) => {
        const url = '/courses';
        return axiosClient.put(url, params);
    },
}