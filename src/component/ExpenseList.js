import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateStr) => {
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

  const groupedTransactions = sortedTransactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div>
      {sortedDates.map((date) => (
        <div key={date}>
          <p
            className={`${
              formatDate(date) === "Today"
                ? "text-[#000000] font-normal"
                : "text-[#AEABAB] text-[12px] font-medium"
            }`}
          >
            {formatDate(date)}
          </p>
          {groupedTransactions[date].map((transaction) => (
            <Link to={`/update/${transaction.id}`} key={transaction.id}>
              <div>
                <ExpenseItem
                  icon={null}
                  name={transaction.category}
                  description={transaction.description}
                  amount={transaction.amount}
                />
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
