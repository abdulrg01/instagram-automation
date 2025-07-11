import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/constant/types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string}>) => {
      const { token } = action.payload;
      state.token = token;
    },
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// export const selectCurrentToken = (state: any) => state.auth.token;
// export const selectCurrentUser = (state: any) => state.auth.user;