import { createSlice } from "@reduxjs/toolkit";
import {
  doAddCourse,
  doAddCourseExcel,
  doDeleteCourse,
  doExportExcelCourse,
  doGetListCourse,
  doUpdateCourse,
} from "../../action";

const initialState = {
  isLoading: false,
  listCourse: [],
  listCourseSearch: [],
} as ICourse;

const slice = createSlice({
  name: "course@",
  initialState: initialState,
  reducers: {
    doSearchListCourse(state, action) {
      state.listCourseSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get list course
    builder.addCase(doGetListCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doGetListCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listCourse = action.payload;
      state.listCourseSearch = action.payload;
    });
    builder.addCase(doGetListCourse.rejected, (state, action) => {
      state.isLoading = false;
    });
    // post add course
    builder.addCase(doAddCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddCourse.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddCourse.rejected, (state, action) => {
      state.isLoading = false;
    });
    // put update course
    builder.addCase(doUpdateCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doUpdateCourse.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doUpdateCourse.rejected, (state, action) => {
      state.isLoading = false;
    });
    // post add course excel
    builder.addCase(doAddCourseExcel.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddCourseExcel.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddCourseExcel.rejected, (state, action) => {
      state.isLoading = false;
    });
    // delete course
    builder.addCase(doDeleteCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doDeleteCourse.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doDeleteCourse.rejected, (state, action) => {
      state.isLoading = false;
    });
    // export excel course
    builder.addCase(doExportExcelCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doExportExcelCourse.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doExportExcelCourse.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
const { reducer: courseReducer, actions } = slice;
export const { doSearchListCourse } = actions;
export default courseReducer;
