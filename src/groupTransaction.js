// transactionHelpers.js

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }
  const options = { day: "2-digit", month: "short" }; // "11 Nov"
  return date.toLocaleDateString("en-US", options);
};
export const groupByDate = (transactions) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const date = formatDate(transaction.date);
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  return { grouped, sortedDates };
};

export const groupByWeekly = (transactions) => {
  const grouped = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const weekStartDate = new Date(
      date.setDate(date.getDate() - date.getDay())
    ); // Get the start of the week
    const weekKey = `${weekStartDate.getDate()} ${weekStartDate.toLocaleString(
      "default",
      { month: "short" }
    )} - ${new Date(
      weekStartDate.setDate(weekStartDate.getDate() + 6)
    ).getDate()} ${weekStartDate.toLocaleString("default", {
      month: "short",
    })}`;

    if (!grouped[weekKey]) {
      grouped[weekKey] = [];
    }
    grouped[weekKey].push(transaction);
  });

  const sortedWeeks = Object.keys(grouped).sort(
    (a, b) => new Date(b.split(" - ")[0]) - new Date(a.split(" - ")[0])
  );
  return { grouped, sortedWeeks };
};

export const groupByMonthly = (transactions) => {
  const grouped = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;

    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(transaction);
  });

  const sortedMonths = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  return { grouped, sortedMonths };
};
