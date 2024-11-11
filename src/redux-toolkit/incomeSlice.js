// incomeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incomes: [], 
};

const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.incomes.push(action.payload); 
    },
    // updateIncome: (state, action) => {
    //   const { id, updatedData } = action.payload;
    //   const incomeIndex = state.incomes.findIndex(inc => inc.id === id);
    //   if (incomeIndex >= 0) {
    //     state.incomes[incomeIndex] = { ...state.incomes[incomeIndex], ...updatedData };
    //   }
    // },
    // removeIncome: (state, action) => {
    //   state.incomes = state.incomes.filter(inc => inc.id !== action.payload);
    // },
  },
});

export const { addIncome, updateIncome, removeIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
