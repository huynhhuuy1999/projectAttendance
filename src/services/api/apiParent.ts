import axiosClient from "./axiosClient";

export const apiParent = {
  getListParent: () => {
    const url = "/users/parents";
    return axiosClient.get(url);
  },
  getOneParent: (id: string) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  postAddParent: (params: IParamUpdateUser) => {
    const url = "/users";
    return axiosClient.post(url, params);
  },
};
