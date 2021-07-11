import axiosClient from "./axiosClient";
import axiosFile from "./axiosFile";
export const apiAttendance = {
  postAttendance: (params: IParamAttendance) => {
    const url = "/attendances";
    return axiosClient.post(url, params);
  },
  postPhotoAttendance: (params: IParamFile) => {
    const url = `/users/students/photos?id=${params.id}`;
    return axiosFile.post(url, params.formData);
  },
  getPhotoAttendance: (idStudent: string) => {
    const url = `/users/students/photos?id=${idStudent}`;
    return axiosClient.get(url);
  },
  getInfoAttendanceOneStudentInClass: (idStudent: String) => {
    const url = `/attendances/student/${idStudent}`;
    return axiosClient.get(url);
  },
};
