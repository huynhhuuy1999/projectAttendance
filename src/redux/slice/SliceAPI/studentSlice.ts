import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doGetReportListAttendanceInSemester } from "../../action/attendanceAction";
import {
  doAddStudent,
  doAddTimetable,
  doDeleteStudentFromClass,
  doGetListStudent,
  doGetListStudentByClass,
  doGetOneStudent,
  doGetTimetableStudent,
} from "../../action/studentAction";

type IStudent = {
  isLoading?: boolean;
  timeTableStudent?: Array<IResponseTimetableStudent>;
  listStudent: Array<ICurrentUser>;
  listStudentSearch: Array<ICurrentUser>;
  oneStudent: ICurrentUser;
  infoParent: ICurrentUser;
  report: {
    clazzId?: string;
    students?: Array<any>;
    present?: number;
    absent?: number;
  };
};

const initialState = {
  isLoading: false,
  timeTableStudent: [],
  listStudent: [],
  listStudentSearch: [],
  oneStudent: { id: "", roles: [{ id: 0, name: "xxx" }] },
  infoParent: { id: "", roles: [{ id: 0, name: "xxx" }] },
  report: {},
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
    //get list student by class
    builder.addCase(doGetListStudentByClass.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetListStudentByClass.fulfilled,
      (state, action: PayloadAction<Array<IResponseStudent>>) => {
        state.isLoading = false;
        state.listStudent = action.payload;
        state.listStudentSearch = action.payload;
      }
    );
    builder.addCase(doGetListStudentByClass.rejected, (state, action) => {
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
    //delete student from class
    builder.addCase(doDeleteStudentFromClass.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doDeleteStudentFromClass.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doDeleteStudentFromClass.rejected, (state, action) => {
      state.isLoading = false;
    });
    // get report
    builder.addCase(
      doGetReportListAttendanceInSemester.pending,
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      doGetReportListAttendanceInSemester.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.report = action.payload;
      }
    );
    builder.addCase(
      doGetReportListAttendanceInSemester.rejected,
      (state, action) => {
        state.isLoading = false;
      }
    );
  },
});
const { reducer: studentReducer, actions } = slice;
export const { doSearchListStudent } = actions;
export default studentReducer;
