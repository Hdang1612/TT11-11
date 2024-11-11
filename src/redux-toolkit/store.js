// store.js
import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import incomeReducer from './incomeSlice';

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    incomes: incomeReducer,
  },
});

export default store;
