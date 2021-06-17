import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiTeacher } from "../../services/api";

export const doGetListTeacher = createAsyncThunk(
    "teacher@get/listTeacher",
    async () => {
        const result = await apiTeacher.getListTeacher();
        return result.data;
    }
);

export const doGetOneTeacher = createAsyncThunk(
    "teacher@get/detailTeacher",
    async (id: string) => {
        const result = await apiTeacher.getOneTeacher(id);
        return result.data;
    }
);

export const doUpdateTeacher = createAsyncThunk(
    "teacher@put/updateTeacher",
    async (params: IParamTeacher) => {
        const result = await apiTeacher.putUpdateTeacher(params);
        return result.data;
    }
);

export const doAddTeacher = createAsyncThunk(
    "teacher@post/addTeacher",
    async (params: IParamTeacher) => {
        const result = await apiTeacher.postAddTeacher(params);
        return result.data;
    }
);