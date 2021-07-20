import { createSlice } from "@reduxjs/toolkit";
import {
  doAddExcelUser,
  doDeleteUser,
  doGetCurrentUser,
  doLogin,
  doUpdateUser,
} from "../../action";

const initialState = {
  isLoading: false,
  currentUser: {},
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
    //delete user
    builder.addCase(doDeleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doDeleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doDeleteUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    //update user
    builder.addCase(doUpdateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doUpdateUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doUpdateUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    // post add user excel
    builder.addCase(doAddExcelUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddExcelUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddExcelUser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
const { reducer: userReducer } = slice;
export default userReducer;
