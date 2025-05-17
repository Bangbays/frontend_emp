import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}
const initialState: AuthState = { token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
  },
});

export const { saveToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
