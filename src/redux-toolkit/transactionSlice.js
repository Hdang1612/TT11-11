import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, saveToStorage } from './localStorage.js';

const calculateInitialBalances = (transactions) => {
  const income = transactions
    .filter(transaction => transaction.transactionType === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const expense = transactions
    .filter(transaction => transaction.transactionType === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return {
    totalIncome: income,
    totalExpense: expense,
    totalBalance: income + expense,
  };
};

const persistedTransactions = getFromStorage("transactions-list") || [];
const initialBalances = calculateInitialBalances(persistedTransactions);

const initialState = {
  transactions: persistedTransactions,
  ...initialBalances,
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
      const updatedData = action.payload;
      const transactionIndex = state.transactions.findIndex(transaction => transaction.id === updatedData.id);
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
  const transactions = [...state.transactions]; 
  const income = transactions
    .filter(transaction => transaction.transactionType === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const expense = transactions
    .filter(transaction => transaction.transactionType === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  state.totalIncome = income;
  state.totalExpense = expense;
  state.totalBalance = income + expense;
};

export const { addTransaction, updateTransaction, removeTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
