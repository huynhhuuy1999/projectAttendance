import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doAddClass, doDeleteClass, doGetListClass, doGetListClassByTeacher, doGetOneClass, doUpdateClass } from "../../action";

const initialState = {
    isLoading: false,
    listClass: [],
    oneClass: {},
    listClassByTeacher: []
} as IClass;

const slice = createSlice({
    name: "class@",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get list class
        builder.addCase(doGetListClass.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(doGetListClass.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listClass = action.payload;
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
        builder.addCase(doGetOneClass.fulfilled, (state, action: PayloadAction<IResponseClass>) => {
            state.isLoading = false;
            state.oneClass = action.payload;
        });
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
    }
});
const { reducer: classReducer } = slice;
export default classReducer;