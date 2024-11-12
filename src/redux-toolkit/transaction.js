// transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, saveToStorage } from './localStorage.js';
import { formatDate,groupByDate, groupByWeekly, groupByMonthly } from '../groupTransaction.js';
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
  groupedTransactions: {
    today: [],
    weekly: [],
    monthly: [],
  },
  ...initialBalances,
};

// Slice
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


    groupTransactions: (state, action) => {
      const { filter } = action.payload;
      const transactions = [...state.transactions];
      let grouped = {};
      let sorted = [];

      // Tùy vào filter là 'today', 'weekly', hay 'monthly', sẽ nhóm giao dịch theo cách khác nhau
      if (filter === 'today') {
        const { grouped: todayGrouped, sortedDates } = groupByDate(transactions);
        grouped = todayGrouped;
        sorted = sortedDates;
      } else if (filter === 'weekly') {
        const { grouped: weeklyGrouped, sortedWeeks } = groupByWeekly(transactions);
        grouped = weeklyGrouped;
        sorted = sortedWeeks;
      } else if (filter === 'monthly') {
        const { grouped: monthlyGrouped, sortedMonths } = groupByMonthly(transactions);
        grouped = monthlyGrouped;
        sorted = sortedMonths;
      }

      state.groupedTransactions = { ...state.groupedTransactions, [filter]: { grouped, sorted } };
    },
  },
});

const updateTotalBalance = (state) => {
  const transactions = [...state.transactions]; 
  // console.log(state)
  // console.log (transactions)
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

export const { addTransaction, updateTransaction, removeTransaction, groupTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
