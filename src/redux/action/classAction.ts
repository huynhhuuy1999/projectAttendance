import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClass } from "../../services/api";

export const doGetListClass = createAsyncThunk(
    "class@get/listClass",
    async () => {
        const result = await apiClass.getListClass();
        return result.data;
    }
);

export const doAddClass = createAsyncThunk(
    "class@post/addClass",
    async (params: IParamClass) => {
        const result = await apiClass.postAddClass(params);
        return result.data;
    }
);

export const doGetOneClass = createAsyncThunk(
    "class@get/oneClass",
    async (id: string) => {
        const result = await apiClass.getOneClass(id);
        return result.data;
    }
);

export const doUpdateClass = createAsyncThunk(
    "class@put/updateClass",
    async (params: IParamClass) => {
        const result = await apiClass.putUpdateClass(params);
        return result.data;
    }
);

export const doDeleteClass = createAsyncThunk(
    "class@delete/deleteClass",
    async (params: IParamClass) => {
        const result = await apiClass.deleteClass(params);
        return result.data;
    }
);

export const doGetListClassByTeacher = createAsyncThunk(
    "class@get/listClassByTeacher",
    async (params: number | string) => {
        const result = await apiClass.getListClassByTeacher(params);
        return result.data;
    }
);

export const doAddClassExcel = createAsyncThunk(
    "class@post/addClassExcel",
    async (params: any) => {
        const result = await apiClass.postAddClassExcel(params);
        return result.data;
    }
);

export const doGetListClassByCourse = createAsyncThunk(
    "class@get/listClassByCourse",
    async (params: string) => {
        const result = await apiClass.getListClassByCourse(params);
        return result.data;
    }
);