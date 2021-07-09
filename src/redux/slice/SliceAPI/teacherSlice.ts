import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  doAddTeacher,
  doGetListTeacher,
  doGetOneTeacher,
  doUpdateTeacher,
} from "../../action/teacherAction";

const initialState = {
  isLoading: false,
  timeTableTeacher: [],
  listTeacher: [],
  listTeacherSearch: [],
  oneTeacher: { id: "", roles: [{ id: 0, name: "xxx" }] },
} as ITeacher;

const slice = createSlice({
  name: "teacher@",
  initialState: initialState,
  reducers: {
    doSearchListTeacher(state, action) {
      state.listTeacherSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    //get list teacher
    builder.addCase(doGetListTeacher.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetListTeacher.fulfilled,
      (state, action: PayloadAction<Array<IResTeacher>>) => {
        state.isLoading = false;
        state.listTeacher = action.payload;
        state.listTeacherSearch = action.payload;
      }
    );
    builder.addCase(doGetListTeacher.rejected, (state, action) => {
      state.isLoading = false;
    });
    // get one teacher
    builder.addCase(doGetOneTeacher.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetOneTeacher.fulfilled,
      (state, action: PayloadAction<IResTeacher>) => {
        state.isLoading = false;
        state.oneTeacher = action.payload;
      }
    );
    builder.addCase(doGetOneTeacher.rejected, (state, action) => {
      state.isLoading = false;
    });
    //put update teacher
    builder.addCase(doUpdateTeacher.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doUpdateTeacher.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doUpdateTeacher.rejected, (state, action) => {
      state.isLoading = false;
    });
    //post add teacher
    builder.addCase(doAddTeacher.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddTeacher.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddTeacher.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
const { reducer: teacherReducer, actions } = slice;
export const { doSearchListTeacher } = actions;
export default teacherReducer;
