import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  doAddParent,
  doGetListParent,
  doGetOneParent,
} from "../../action/parentAction";

type TInitialState = {
  isLoading: boolean;
  err: any;
  listParent: Array<ICurrentUser>;
  listParentSearch: Array<ICurrentUser>;
  oneParent: ICurrentUser;
};

const initialState = {
  isLoading: false,
  listParent: [],
  err: "",
  listParentSearch: [],
  oneParent: { id: "", roles: [{ id: 0, name: "xxx" }] },
} as TInitialState;

const slice = createSlice({
  name: "parent@",
  initialState: initialState,
  reducers: {
    doSearchListParent(state, action) {
      state.listParentSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    //get list student
    builder.addCase(doGetListParent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetListParent.fulfilled,
      (state, action: PayloadAction<Array<IResponseParent>>) => {
        state.isLoading = false;
        state.listParent = action.payload;
        state.listParentSearch = action.payload;
      }
    );
    builder.addCase(doGetListParent.rejected, (state, action) => {
      state.isLoading = false;
    });
    //get one parent
    builder.addCase(doGetOneParent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetOneParent.fulfilled,
      (state, action: PayloadAction<IResponseParent>) => {
        state.isLoading = false;
        state.oneParent = action.payload;
      }
    );
    builder.addCase(doGetOneParent.rejected, (state, action) => {
      state.isLoading = false;
    });
    //post add parent
    builder.addCase(doAddParent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(doAddParent.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(doAddParent.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
const { reducer: studentReducer, actions } = slice;
export const { doSearchListParent } = actions;
export default studentReducer;
