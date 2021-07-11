import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiStudent } from "../../services/api";

export const doGetTimetableStudent = createAsyncThunk(
  "student@get/timetableStudent",
  async (params: IParamTimeTableStudent) => {
    const result = await apiStudent.getTimetableStudent(params);
    return result.data;
  }
);

export const doGetListStudent = createAsyncThunk(
  "student@get/listStudent",
  async () => {
    const result = await apiStudent.getListStudent();
    return result.data;
  }
);

export const doGetOneStudent = createAsyncThunk(
  "student@get/detailStudent",
  async (id: string) => {
    const result = await apiStudent.getOneStudent(id);
    return result.data;
  }
);

export const doAddStudent = createAsyncThunk(
  "student@post/addStudent",
  async (params: IParamStudent) => {
    const result = await apiStudent.postAddStudent(params);
    return result.data;
  }
);

export const doAddTimetable = createAsyncThunk(
  "student@post/addTimetable",
  async (params: any) => {
    const result = await apiStudent.postAddTimetable(params);
    return result.data;
  }
);
