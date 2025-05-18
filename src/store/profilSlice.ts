import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types/profile";

interface ProfilState {
  data: UserProfile | null;
}
const initialState: ProfilState = { data: null };

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.data = action.payload;
    },
    clearProfile(state) {
      state.data = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
