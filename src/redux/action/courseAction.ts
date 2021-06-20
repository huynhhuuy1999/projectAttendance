import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCourse } from "../../services/api/apiCourse";

export const doGetListCourse = createAsyncThunk(
  "course@get/listCourse",
  async () => {
    const result = await apiCourse.getListCourse();
    return result.data;
  }
);

export const doAddCourse = createAsyncThunk(
  "course@post/addCourse",
  async (params: IParamCreateCourse) => {
    const result = await apiCourse.postAddCourse(params);
    return result.data;
  }
);

export const doUpdateCourse = createAsyncThunk(
  "course@put/updateCourse",
  async (params: IParamCreateCourse) => {
    const result = await apiCourse.putUpdateCourse(params);
    return result.data;
  }
);

export const doAddCourseExcel = createAsyncThunk(
  "course@post/addCourseExcel",
  async (params: any) => {
    const result = await apiCourse.postAddCourseExcel(params);
    return result.data;
  }
);

export const doDeleteCourse = createAsyncThunk(
  "course@delete/deleteCourse",
  async (params: { id: string }) => {
    const result = await apiCourse.deleteCourse(params);
    return result.data;
  }
);
