import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userID: string | null;
  email: string | null;

}
const initialState: UserState = {
  userID: null,
  email: null,

};
export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.userID = action.payload.userID;
      state.email = action.payload.email;
   
    },
    logout: (state) => {
      state.userID = null;
      state.email = null;

    },
  },
});
export const userActions = userSlice.actions;
export const userReducers = userSlice.reducer;
