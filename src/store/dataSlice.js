import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currPincode: "",
  pincodes: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log(state, action);
      state.pincodes = action.payload.data;
    },
    setCurrPincode: (state, action) => {
      state.currPincode = action.payload.pin;
    },
  },
});

export const { setData, setCurrPincode } = dataSlice.actions;

export default dataSlice.reducer;
