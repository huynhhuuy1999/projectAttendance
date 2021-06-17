import axiosClient from "./axiosClient";
export const apiClass = {
    getListClass: () => {
        const url = "/classes";
        return axiosClient.get(url);
    },
    postAddClass: (params: IParamClass) => {
        const url = "/classes";
        return axiosClient.post(url, params);
    },
    getOneClass: (id: string) => {
        const url = "/classes/" + id;
        return axiosClient.get(url);
    },
    putUpdateClass: (params: IParamClass) => {
        const url = "/classes";
        return axiosClient.put(url, params);
    },
    deleteClass: (params: IParamClass) => {
        const url = "/classes";
        return axiosClient.delete(url, { data: params });
    },
    getListClassByTeacher: (params: string | number) => {
        const url = `/classes/teacher/${params}`
        return axiosClient.get(url);
    }
}