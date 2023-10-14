import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const saveEmailSlice = createSlice({
  name: "saveEmail",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateEmail } = saveEmailSlice.actions;

export default saveEmailSlice.reducer;
