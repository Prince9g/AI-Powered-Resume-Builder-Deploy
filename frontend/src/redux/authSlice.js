import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  resumes: [],
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload.user;
      state.resumes = action.payload.resumes || [];
    },
    logoutUser: (state) => {
      state.user = null;
      state.resumes = [];
    },
    // Add other auth-related reducers as needed
  },
});

export const { setAuthUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;