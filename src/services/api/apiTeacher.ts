import axiosClient from "./axiosClient";
export const apiTeacher = {
  getListTeacher: () => {
    const url = "/users/teachers";
    return axiosClient.get(url);
  },
  getOneTeacher: (id: string) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  postAddTeacher: (params: IParamTeacher) => {
    const url = "/users";
    return axiosClient.post(url, params);
  },
};
