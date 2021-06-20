import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup/lib/locale";
import {
    doAttendanceStudent,
    doGetPhotoAttendance,
    doUploadPhotoAttendance,
} from "../../action/attendanceAction";

const initialState = {
    isLoading: false,
    error: {},
    listPhotoAttendance: [],
} as IAttendance;

const slice = createSlice({
    name: "attendance@",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get list class
        builder.addCase(doAttendanceStudent.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(doAttendanceStudent.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(doAttendanceStudent.rejected, (state, action) => {
            state.isLoading = false;
        });
        //upload photo attendance
        builder.addCase(doUploadPhotoAttendance.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(doUploadPhotoAttendance.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("action", action.payload);
        });
        builder.addCase(doUploadPhotoAttendance.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        //get photo attendance
        builder.addCase(doGetPhotoAttendance.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(
            doGetPhotoAttendance.fulfilled,
            (state, action: PayloadAction<Array<IResPhotoAttendance>>) => {
                state.isLoading = false;
                state.listPhotoAttendance = action.payload;
            }
        );
        builder.addCase(doGetPhotoAttendance.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});
const { reducer: attendanceReducer } = slice;
export default attendanceReducer;
