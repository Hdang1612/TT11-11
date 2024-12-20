import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Empty } from 'antd'
import {
  selectTodayTransactions,
  selectMonthlyTransactions,
  selectWeeklyTransactions,
} from '../redux-toolkit/transactionSlice'
import { setTransactionData, toggleModal } from '../redux-toolkit/modalSlice'
import ExpenseItem from './TransactionItem'

export const TransactionListPagination = ({ transactions }) => {
  const dispatch = useDispatch()
  const handleItemClick = (transaction) => {
    dispatch(setTransactionData(transaction))
    dispatch(toggleModal(true))
  }
  return (
    <div >
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <ExpenseItem
            key={transaction.id}
            name={transaction.category}
            description={transaction.description}
            amount={transaction.amount}
            onClick={() => handleItemClick(transaction)}
          />
        ))
      ) : (
        <Empty description="No transaction " />
      )}
    </div>
  )
}
export const TransactionList = ({ transactions }) => {
  const dispatch = useDispatch()
  const handleItemClick = (transaction) => {
    dispatch(setTransactionData(transaction))
    dispatch(toggleModal(true))
  }

  return (
    <div className='h-[740px] md:h-[660px] '>
      {Array.isArray(transactions) && transactions.length > 0 ? (
        transactions.map((group, index) => {
          if (group.transactions) {
            // Nếu là nhóm giao dịch, render tên nhóm và các giao dịch bên trong
            return (
              <div key={index}>
                <h3>{group.name}</h3>
                {group.transactions.map((transaction) => (
                  <ExpenseItem
                    key={transaction.id}
                    name={transaction.category}
                    description={transaction.description}
                    amount={transaction.amount}
                    onClick={() => handleItemClick(transaction)}
                  />
                ))}
              </div>
            )
          } else {
            // Nếu là danh sách giao dịch đơn lẻ, render mỗi giao dịch
            return (
              <div key={index}>
                <ExpenseItem
                  key={group.id}
                  name={group.category}
                  description={group.description}
                  amount={group.amount}
                  onClick={() => handleItemClick(group)}
                />
              </div>
            )
          }
        })
      ) : (
        <Empty description="No transaction " />
      )}
    </div>
  )
}

export const TodayTransactionsList = () => {
  const transactions = useSelector(selectTodayTransactions)
  console.log(transactions)
  return <TransactionList transactions={transactions} />
}

export const WeeklyTransactionsList = () => {
  const transactions = useSelector(selectWeeklyTransactions)

  return <TransactionList transactions={transactions} />
}

export const MonthlyTransactionsList = () => {
  const transactions = useSelector(selectMonthlyTransactions)

  return <TransactionList transactions={transactions} />
}
