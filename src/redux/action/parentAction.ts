import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiParent } from "../../services/api";

export const doGetListParent = createAsyncThunk(
  "parent@get/listparent",
  async () => {
    const result = await apiParent.getListParent();
    return result.data;
  }
);

export const doGetOneParent = createAsyncThunk(
  "parent@get/detailParent",
  async (id: string) => {
    const result = await apiParent.getOneParent(id);
    return result.data;
  }
);

export const doAddParent = createAsyncThunk(
  "parent@post/addParent",
  async (params: IParamUpdateUser) => {
    const result = await apiParent.postAddParent(params);
    return result.data;
  }
);
