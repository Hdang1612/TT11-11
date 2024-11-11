// expenseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [], 
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload); 
      localStorage.setItem("expenses-list", JSON.stringify(state.expenses))
    },
    // updateExpense: (state, action) => {
    //   const { id, updatedData } = action.payload;
    //   const expenseIndex = state.expenses.findIndex(exp => exp.id === id);
    //   if (expenseIndex >= 0) {
    //     state.expenses[expenseIndex] = { ...state.expenses[expenseIndex], ...updatedData };
    //   }
    // },
    // removeExpense: (state, action) => {
    //   state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
    // },
  },
});

export const { addExpense, updateExpense, removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
