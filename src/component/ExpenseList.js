import React from "react";
import { useSelector } from "react-redux";
import ExpenseItem from "./ExpenseItem";
import { groupByDate,groupByMonth,groupByWeek } from "../untils/filterTransaction";
import { useDispatch } from "react-redux";
import { openModal } from "../redux-toolkit/modalSlice";
const ExpenseList = ({ filter, onTransactionClick }) => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch=useDispatch()
  
  const handleOpenUpdateModal = (transaction) => {
    dispatch(openModal({ mode: "update", transactionData: transaction }));
  };

  const filterTransactions = (filter) => {
    switch (filter) {
      case "today":
        return groupByDate(transactions);
      case "weekly":
        return groupByWeek(transactions);
      case "monthly":
        return groupByMonth(transactions);
      default:
        return { grouped: {}, sorted: [] };
    }
  };

  const { grouped, sorted } = filterTransactions(filter);

  return (
    <div className="max-h-[560px] md:max-h-[460px]">
      {sorted.map((group) => (
        <div key={group}>
          <p className="text-[16px] font-medium">{group}</p>
          {grouped[group].map((transaction) => (
            <div
              key={transaction.id}
              onClick={() => handleOpenUpdateModal(transaction)}
              className="cursor-pointer"
            >
              <ExpenseItem
                icon={null}
                name={transaction.category}
                description={transaction.description}
                amount={transaction.amount}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
