import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  title: "",
  transactionData: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
        state.isShow = true;
        state.mode = action.payload.mode;  
        state.transactionData = action.payload.transactionData || null;
      },
    closeModal: (state) => {
        state.isShow = false;
        state.transactionData = null;  
      },
  },
});

export const { openModal, closeModal } =
  modalSlice.actions;

export default modalSlice.reducer;
