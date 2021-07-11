import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import {
  doAttendanceStudent,
  doGetInfoAttendanceOneStudentInClass,
  doGetPhotoAttendance,
  doUploadPhotoAttendance,
} from "../../action/attendanceAction";

type IAttendance = {
  isLoading?: boolean;
  error?: any;
  listPhotoAttendance: Array<IResPhotoAttendance>;
  listInfoAttandanceOneStudentInClassSearch: Array<{
    date: String;
    time: String;
  }>;
  listInfoAttandanceOneStudentInClass: Array<{ date: String; time: String }>;
  classId?: string;
};

const initialState = {
  isLoading: false,
  error: {},
  listPhotoAttendance: [],
  listInfoAttandanceOneStudentInClass: [],
  classId: "",
  listInfoAttandanceOneStudentInClassSearch: [],
} as IAttendance;

const slice = createSlice({
  name: "attendance@",
  initialState: initialState,
  reducers: {
    doGetClassId: (state, actions) => {
      state.classId = actions.payload;
    },
    doSearchInfoAttandanceOneStudentInClass(state, action) {
      state.listInfoAttandanceOneStudentInClassSearch = action.payload;
    },
  },
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
    //get info attendance one student in class
    builder.addCase(
      doGetInfoAttendanceOneStudentInClass.pending,
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      doGetInfoAttendanceOneStudentInClass.fulfilled,
      (state, action: PayloadAction<Array<IResInfoAttandance>>) => {
        state.isLoading = false;
        let listInfoAttendanceOneStudent = action.payload;
        let listInfo = listInfoAttendanceOneStudent.filter(
          (item) => item.clazz?.id === state.classId
        );
        let covertListInfo = listInfo.map((item) => {
          let date = moment(item.time).format("DD-MM-YYYY");
          let time = moment(item.time).format("hh:mm:ss");
          let convertItem = {
            date,
            time,
          };
          return convertItem;
        });
        state.listInfoAttandanceOneStudentInClassSearch = covertListInfo;
        state.listInfoAttandanceOneStudentInClass = covertListInfo;
      }
    );
    builder.addCase(
      doGetInfoAttendanceOneStudentInClass.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      }
    );
  },
});
const { reducer: attendanceReducer, actions } = slice;
export const { doGetClassId, doSearchInfoAttandanceOneStudentInClass } =
  actions;
export default attendanceReducer;
