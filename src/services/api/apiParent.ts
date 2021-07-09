import axiosClient from "./axiosClient";

export const apiParent = {
  getListParent: () => {
    const url = "/users/parents";
    return axiosClient.get(url);
  },
};
