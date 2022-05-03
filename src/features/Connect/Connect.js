import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "MyValue",
  initialState: {
    value: "",
    open: true,
  },
  reducers: {
    SetIssuerList: (state, action) => {
      state.value = action.payload;
    },
    SetopenPop: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { SetIssuerList } = counterSlice.actions;

export const selectIssuerList = (state) => state.MyValue.value;
export const slectopenPop = (state) => state.MyValue.open;

export default counterSlice.reducer;
