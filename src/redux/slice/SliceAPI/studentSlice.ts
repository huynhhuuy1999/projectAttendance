import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  doAddStudent,
  doAddTimetable,
  doGetListStudent,
  doGetOneStudent,
  doGetTimetableStudent,
} from "../../action/studentAction";

const initialState = {
  isLoading: false,
  timeTableStudent: [],
  listStudent: [],
  listStudentSearch: [],
  oneStudent: { id: "", roles: [{ id: 0, name: "xxx" }] },
} as IStudent;

const slice = createSlice({
  name: "student@",
  initialState: initialState,
  reducers: {
    doSearchListStudent(state, action) {
      state.listStudentSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    //get timetable student
    builder.addCase(doGetTimetableStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetTimetableStudent.fulfilled,
      (state, action: PayloadAction<Array<IResponseTimetableStudent>>) => {
        state.isLoading = false;
        state.timeTableStudent = action.payload;
      }
    );
    builder.addCase(doGetTimetableStudent.rejected, (state, action) => {
      state.isLoading = false;
    });
    //get list student
    builder.addCase(doGetListStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetListStudent.fulfilled,
      (state, action: PayloadAction<Array<IResponseStudent>>) => {
        state.isLoading = false;
        state.listStudent = action.payload;
        state.listStudentSearch = action.payload;
      }
    );
    builder.addCase(doGetListStudent.rejected, (state, action) => {
      state.isLoading = false;
    });
    //get one student
    builder.addCase(doGetOneStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetOneStudent.fulfilled,
      (state, action: PayloadAction<IResponseStudent>) => {
        state.isLoading = false;
        state.oneStudent = action.payload;
      }
    );
    builder.addCase(doGetOneStudent.rejected, (state, action) => {
      state.isLoading = false;
    });
    //post add student
    builder.addCase(doAddStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddStudent.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddStudent.rejected, (state, action) => {
      state.isLoading = false;
    });
    //post add timetable
    builder.addCase(doAddTimetable.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddTimetable.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddTimetable.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
const { reducer: studentReducer, actions } = slice;
export const { doSearchListStudent } = actions;
export default studentReducer;
