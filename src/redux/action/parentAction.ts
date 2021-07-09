import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiParent } from "../../services/api";

export const doGetListParent = createAsyncThunk(
  "parent@get/listparent",
  async () => {
    const result = await apiParent.getListParent();
    return result.data;
  }
);
