import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ExpenseItem from "./ExpenseItem";
import { useEffect } from "react";
import { groupTransactions } from "../redux-toolkit/transaction";
const ExpenseList = ({ filter, onTransactionClick }) => {
  const dispatch = useDispatch();

  const groupedTransactions = useSelector(
    (state) => state.transactions.groupedTransactions[filter]
  );
  const transactions = useSelector((state) => state.transactions.transactions);

  useEffect(() => {
    dispatch(groupTransactions({ filter }));
  }, [filter, dispatch]);

  useEffect(() => {
    if (transactions.length > 0) {
      dispatch(groupTransactions({ filter }));
    }
  }, [transactions, filter, dispatch]);

  return (
    <div className="max-h-[560px]  md:max-h-[460px]">
      {groupedTransactions?.sorted?.map((group) => (
        <div key={group}>
          <p className=" text-[16px] font-medium">{group}</p>
          {groupedTransactions.grouped[group].map((transaction) => (
            <div
              key={transaction.id}
              onClick={() => onTransactionClick(transaction)}
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
