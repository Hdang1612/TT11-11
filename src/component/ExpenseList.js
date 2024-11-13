import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpenseItem from './ExpenseItem';
import { useEffect } from 'react';
import { groupTransactions } from '../redux-toolkit/transaction';
const ExpenseList = ({ filter }) => {
  const dispatch = useDispatch();
  const groupedTransactions = useSelector((state) => state.transactions.groupedTransactions[filter]);

  useEffect(() => {
    dispatch(groupTransactions({ filter }));
  }, [filter, dispatch]);
 

  return (
    <div className='max-h-[560px]  md:max-h-[460px]'>
      {groupedTransactions?.sorted?.map((group) => (
        <div key={group}>
          <p className=" text-[16px] font-medium">{group}</p>
          {groupedTransactions.grouped[group].map((transaction) => (
            <Link to={`/update/${transaction.id}`} key={transaction.id}>
              <ExpenseItem
                icon={null}
                name={transaction.category}
                description={transaction.description}
                amount={transaction.amount}
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
    // <div>
    //   {sortedDates.map((date) => (
    //     <div key={date}>
    //       <p
    //         className={`${
    //           formatDate(date) === "Today"
    //             ? "text-[#000000] font-normal"
    //             : "text-[#AEABAB] text-[12px] font-medium"
    //         }`}
    //       >
    //         {formatDate(date)}
    //       </p>
    //       {groupedTransactions[date].map((transaction) => (
    //         <Link to={`/update/${transaction.id}`} key={transaction.id}>
    //           <div>
    //             <ExpenseItem
    //               icon={null}
    //               name={transaction.category}
    //               description={transaction.description}
    //               amount={transaction.amount}
    //             />
    //           </div>
    //         </Link>
    //       ))}
    //     </div>
    //   ))}
    // </div>
  // );
};

export default ExpenseList;
