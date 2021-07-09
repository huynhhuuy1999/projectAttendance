import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  doAddClass,
  doAddClassExcel,
  doDeleteClass,
  doGetListClass,
  doGetListClassByCourse,
  doGetListClassByTeacher,
  doGetOneClass,
  doUpdateClass,
} from "../../action";

const initialState = {
  isLoading: false,
  listClass: [],
  listClassSearch: [],
  oneClass: {},
  listClassByTeacher: [],
} as IClass;

const slice = createSlice({
  name: "class@",
  initialState: initialState,
  reducers: {
    doSearchListClass(state, action) {
      state.listClassSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get list class
    builder.addCase(doGetListClass.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doGetListClass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listClass = action.payload;
      state.listClassSearch = action.payload;
    });
    builder.addCase(doGetListClass.rejected, (state, action) => {
      state.isLoading = false;
    });
    // post add class
    builder.addCase(doAddClass.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddClass.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddClass.rejected, (state, action) => {
      state.isLoading = false;
    });
    // get one class
    builder.addCase(doGetOneClass.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetOneClass.fulfilled,
      (state, action: PayloadAction<IResponseClass>) => {
        state.isLoading = false;
        state.oneClass = action.payload;
      }
    );
    builder.addCase(doGetOneClass.rejected, (state, action) => {
      state.isLoading = false;
    });
    // put update class
    builder.addCase(doUpdateClass.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doUpdateClass.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doUpdateClass.rejected, (state, action) => {
      state.isLoading = false;
    });
    // delete class
    builder.addCase(doDeleteClass.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doDeleteClass.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doDeleteClass.rejected, (state, action) => {
      state.isLoading = false;
    });
    // get list class by teacher
    builder.addCase(doGetListClassByTeacher.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doGetListClassByTeacher.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listClassByTeacher = action.payload;
    });
    builder.addCase(doGetListClassByTeacher.rejected, (state, action) => {
      state.isLoading = false;
    });
    // post add class excel
    builder.addCase(doAddClassExcel.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddClassExcel.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddClassExcel.rejected, (state, action) => {
      state.isLoading = false;
    });
    // get list class by course
    builder.addCase(doGetListClassByCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doGetListClassByCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listClass = action.payload;
    });
    builder.addCase(doGetListClassByCourse.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
const { reducer: classReducer, actions } = slice;
export const { doSearchListClass } = actions;
export default classReducer;
