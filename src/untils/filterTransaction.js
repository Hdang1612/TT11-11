import { formatDate } from "./date";

export const groupByDate = (transactions) => {
  const grouped = {};
  const sorted = [];

  transactions.forEach((transaction) => {
    const formattedDate = formatDate(transaction.date);
    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
      sorted.push(formattedDate);
    }
    grouped[formattedDate].push(transaction);
  });

  sorted.sort((a, b) => new Date(b) - new Date(a));

  return { grouped, sorted };
};

export const groupByWeek = (transactions) => {
  const grouped = {};
  const sorted = [];

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);

    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formattedStart = formatDate(startOfWeek.toISOString());
    const formattedEnd = formatDate(endOfWeek.toISOString());

    const key = `${formattedStart} - ${formattedEnd}`;

    if (!grouped[key]) {
      grouped[key] = [];
      sorted.push({ key, date: startOfWeek });
    }

    grouped[key].push(transaction);
  });

  sorted.sort((a, b) => b.date - a.date);

  return {
    grouped,
    sorted: sorted.map((item) => item.key),
  };
};

// Group by Month
export const groupByMonth = (transactions) => {
  const grouped = {};
  const sorted = [];

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!grouped[key]) {
      grouped[key] = [];
      sorted.push({ key, date: new Date(year, date.getMonth(), 1) });
    }
    grouped[key].push(transaction);
  });

  sorted.sort((a, b) => b.date - a.date);

  return {
    grouped,
    sorted: sorted.map((item) => item.key),
  };
};

export const calculateMonthlyTotals = (transactions) => {
  const totals = Array(12)
    .fill(null)
    .map(() => ({ income: 0, expense: 0 }));

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthIndex = date.getMonth(); // 0 = January, 11 = December

    if (transaction.transactionType === "income") {
      totals[monthIndex].income += transaction.amount;
    } else if (transaction.transactionType === "expense") {
      totals[monthIndex].expense += transaction.amount;
    }
  });

  return totals.map((totals, index) => ({
    month: new Date(2024, index).toLocaleString("en-US", { month: "short" }),
    income: totals.income,
    expense: totals.expense,
  }));
};
