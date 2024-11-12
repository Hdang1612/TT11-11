// transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, saveToStorage } from './localStorage.js';

const initialState = {
  transactions: getFromStorage("transactions-list") || [], 
  totalBalance: 0, 
  totalIncome: 0, 
  totalExpense: 0, 
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      saveToStorage("transactions-list", state.transactions);
      updateTotalBalance(state);
    },
    
    updateTransaction: (state, action) => {
      const { id, updatedData } = action.payload;
      const transactionIndex = state.transactions.findIndex(transaction => transaction.id === id);
      if (transactionIndex >= 0) {
        state.transactions[transactionIndex] = { ...state.transactions[transactionIndex], ...updatedData };
        saveToStorage("transactions-list", state.transactions);
        updateTotalBalance(state);
      }
    },
    
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
      saveToStorage("transactions-list", state.transactions);
      updateTotalBalance(state);
    },
  },
});

const updateTotalBalance = (state) => {
  const income = state.transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const expense = state.transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  state.totalIncome = income;
  state.totalExpense = expense;
  state.totalBalance = income - expense;
};

export const { addTransaction, updateTransaction, removeTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
