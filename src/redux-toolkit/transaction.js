// transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, saveToStorage } from './localStorage.js';
import {groupByDate, groupByWeekly, groupByMonthly } from '../groupTransaction.js';
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
const persistedGroupedTransactions = getFromStorage("grouped-transactions") || {
  today: [],
  weekly: [],
  monthly: []
};
const initialState = {
  transactions: persistedTransactions,
  groupedTransactions: persistedGroupedTransactions,
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
      const updatedData = action.payload;
      const transactionIndex = state.transactions.findIndex(transaction => transaction.id ===updatedData.id);
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

      let grouped = {}; // chứa mảng các transaction của từng group 
      let sorted = []; // chưa danh sách các ngày , tháng , năm đại diện cho group 

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
        const monthlyStats = {};
        Object.keys(grouped).forEach(month => {
          const monthTransactions = grouped[month];
          const income = monthTransactions
            .filter(transaction => transaction.transactionType === 'income')
            .reduce((acc, transaction) => acc + transaction.amount, 0);

          const expense = monthTransactions
            .filter(transaction => transaction.transactionType === 'expense')
            .reduce((acc, transaction) => acc + transaction.amount, 0);

          const balance = income + expense; // balance = income - expense
          monthlyStats[month] = { income, expense, balance };
          // console.log(monthlyStats)
        });
        state.groupedTransactions = { 
          ...state.groupedTransactions, 
          monthly: { 
            grouped, 
            sorted, 
            stats: monthlyStats 
          } 
        };
      }
      if (filter !== 'monthly') {
        state.groupedTransactions = { 
          ...state.groupedTransactions, 
          [filter]: { 
            grouped, 
            sorted 
          } }}
          saveToStorage("grouped-transactions", state.groupedTransactions);
      // state.groupedTransactions = { ...state.groupedTransactions, [filter]: { grouped, sorted  } };
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
