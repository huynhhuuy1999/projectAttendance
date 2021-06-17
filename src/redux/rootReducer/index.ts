import { combineReducers } from "redux";
import user from "../slice/SliceAPI/userSlice";
import student from '../slice/SliceAPI/studentSlice';
import course from '../slice/SliceAPI/courseSlice';
import clazz from '../slice/SliceAPI/classSlice';
import teacher from '../slice/SliceAPI/teacherSlice';
import attendance from '../slice/SliceAPI/attenanceSlice';

export const rootReducer = combineReducers({
  user,
  student,
  course,
  clazz,
  teacher,
  attendance
});
export type RootState = ReturnType<typeof rootReducer>;