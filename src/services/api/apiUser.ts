import { objToQuery } from "../../helper/api";
import axiosClient from "./axiosClient";
export const apiUser = {
  postLogin: (param: IParamLogin) => {
    const url = "/auth";
    return axiosClient.post(url, param);
  },
  getCurrentUser: () => {
    const url = "/auth";
    return axiosClient.get(url);
  },
  getTimetableStudent: (params: IParamTimeTableStudent) => {
    const url = "/timetables/student/";
    return axiosClient.get(url + params.userId + '/' + params.year + '/' + params.semester);
    // return axiosClient.get('/timetables/student/17521224/2020/2');
    // return axiosClient.get(url + objToQuery({ ...params }));
  }
};
