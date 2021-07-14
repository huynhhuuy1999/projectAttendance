import axiosClient from "./axiosClient";
import axiosFile from "./axiosFile";
export const apiCourse = {
  getListCourse: () => {
    const url = "/courses";
    return axiosClient.get(url);
  },
  postAddCourse: (params: IParamCreateCourse) => {
    const url = "/courses";
    return axiosClient.post(url, params);
  },
  putUpdateCourse: (params: IParamCreateCourse) => {
    const url = "/courses";
    return axiosClient.put(url, params);
  },
  postAddCourseExcel: (params: any) => {
    const url = `/excel/courses`;
    return axiosFile.post(url, params);
  },
  deleteCourse: (params: { id: string }) => {
    const url = "/courses";
    return axiosClient.delete(url, { data: params });
  },
  exportExcelCourse: () => {
    const url = `/excel/export/courses`;
    return axiosClient.get(url);
  },
};
