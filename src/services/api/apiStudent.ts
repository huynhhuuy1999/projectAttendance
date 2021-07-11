import axiosClient from "./axiosClient";
import axiosFile from "./axiosFile";
export const apiStudent = {
  getTimetableStudent: (params: IParamTimeTableStudent) => {
    const url = "/timetables/student/";
    return axiosClient.get(
      url + params.userId + "/" + params.year + "/" + params.semester
    );
  },
  getListStudent: () => {
    const url = "/users/students";
    return axiosClient.get(url);
  },
  getOneStudent: (id: string) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  postAddStudent: (params: IParamStudent) => {
    const url = "/users";
    return axiosClient.post(url, params);
  },
  postAddTimetable: (params: any) => {
    const url = "/excel/timetables";
    return axiosFile.post(url, params);
  },
};
