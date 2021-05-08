import { combineReducers } from "redux";
import user from "../slice/SliceAPI/userSlice";

export const rootReducer = combineReducers({
  user,
});
export type RootState = ReturnType<typeof rootReducer>;