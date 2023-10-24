import { createSlice } from "@reduxjs/toolkit";

// valeur par default
const initialState = {
  value: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  // actions
  reducers: {
    updateTokenBy: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTokenBy } = tokenSlice.actions;

export default tokenSlice.reducer;
