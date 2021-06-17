import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCourse } from "../../services/api/apiCourse";

export const doGetListCourse = createAsyncThunk(
    "course@get/listCourse",
    async () => {
        const result = await apiCourse.getListCourse();
        return result.data;
    },

);

export const doAddCourse = createAsyncThunk(
    "course@post/addCourse",
    async (params: IParamCreateCourse) => {
        const result = await apiCourse.postAddCourse(params);
        return result.data;
    },
);

export const doUpdateCourse = createAsyncThunk(
    "course@put/updateCourse",
    async (params: IParamCreateCourse) => {
        const result = await apiCourse.putUpdateCourse(params);
        return result.data;
    }
)