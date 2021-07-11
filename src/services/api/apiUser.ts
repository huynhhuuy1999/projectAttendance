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
  deleteUser: (param: IParamUSer) => {
    const url = "/users";
    return axiosClient.delete(url, { data: param });
  },
  putUpdateUser: (param: IParamUpdateUser) => {
    const url = "/users";
    return axiosClient.put(url, param);
  },
};
