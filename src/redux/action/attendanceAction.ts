import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAttendance } from "../../services/api/apiAttendance";

export const doAttendanceStudent = createAsyncThunk(
  "attendance@post/attenance",
  async (params: IParamAttendance) => {
    const result = await apiAttendance.postAttendance(params);
    return result.data;
  }
);

export const doUploadPhotoAttendance = createAsyncThunk(
  "attendance@post/photoAttendance",
  async (params: IParamFile) => {
    const result = await apiAttendance.postPhotoAttendance(params);
    return result.data;
  }
);

export const doGetPhotoAttendance = createAsyncThunk(
  "attendance@get/photoAttendance",
  async (idStudent: string) => {
    const result = await apiAttendance.getPhotoAttendance(idStudent);
    return result.data;
  }
);

export const doGetInfoAttendanceOneStudentInClass = createAsyncThunk(
  "attendance@get/InfoAttendanceOneStudentInClass",
  async (idStudent: string) => {
    const result = await apiAttendance.getInfoAttendanceOneStudentInClass(
      idStudent
    );
    return result.data;
  }
);
