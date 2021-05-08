import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { setCookie } from "../../../helper";
import { apiUser } from "../../../services/api";

export const doLogin = createAsyncThunk("user@get/login", async (params: IParamLogin) => {
  const result = await apiUser.postLogin(params);
  return result.data;
});

export const doGetCurrentUser = createAsyncThunk(
  "user@get/currentUser",
  async () => {
    const result = await apiUser.getCurrentUser();
    return result.data;
  }
);

export const doGetTimetableStudent = createAsyncThunk(
  "user@get/timetableStudent",
  async (params: IParamTimeTableStudent) => {
    const result = await apiUser.getTimetableStudent(params);
    console.log(result)
    return result.data;
  }
);

const initialState = {
  isLoading: false,
  currentUser: {},
  timeTableStudent: {},
} as ICurrentUserInitialState;

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder.addCase(doLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      state.isLoading = false;
    });
    //get current user
    builder.addCase(doGetCurrentUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doGetCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(doGetCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    //get timetable student
    builder.addCase(doGetTimetableStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doGetTimetableStudent.fulfilled, (state, action: PayloadAction<IResponseTimetableStudent>) => {
      state.isLoading = false;
      console.log(action.payload);
      state.timeTableStudent = action.payload;
    });
    builder.addCase(doGetTimetableStudent.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
const { reducer: userReducer } = slice;
export default userReducer;
