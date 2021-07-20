import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUser } from "../../services/api";

export const doLogin = createAsyncThunk(
  "user@get/login",
  async (params: IParamLogin) => {
    const result = await apiUser.postLogin(params);
    return result.data;
  }
);
export const doGetCurrentUser = createAsyncThunk(
  "user@get/currentUser",
  async () => {
    const result = await apiUser.getCurrentUser();
    return result.data;
  }
);
export const doDeleteUser = createAsyncThunk(
  "user@delete/user",
  async (params: IParamUSer) => {
    const result = await apiUser.deleteUser(params);
    return result.data;
  }
);
export const doUpdateUser = createAsyncThunk(
  "user/delete/user",
  async (params: IParamUpdateUser) => {
    const result = await apiUser.putUpdateUser(params);
    return result.data;
  }
);

export const doAddExcelUser = createAsyncThunk(
  "user/post/addExcelUser",
  async (params: any) => {
    const result = await apiUser.addExcelUser(params);
    return result.data;
  }
);
