import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./user";
const store = configureStore({
  reducer: { user: userReducers },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;

