import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types/profile";

interface ProfileState {
  profile: UserProfile | null;
}
const initialState: ProfileState = { profile: null };

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
    },
    updateProfilSuccess(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
    },
  },
});

export const { setProfile, updateProfilSuccess } = slice.actions;
export default slice.reducer;
