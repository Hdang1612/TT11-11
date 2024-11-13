import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import {
  updateTransaction,
  removeTransaction,
} from "../redux-toolkit/transaction"; // Unified actions for both income and expense
import { transactionTypes } from "../component/ExpenseItem";
import { showSuccessToast, showErrorToast } from '../component/Toaste.js';
function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allTransactions = useSelector(
    (state) => state.transactions.transactions
  );
  const states = useSelector((state) => state); //check
  const transaction = allTransactions.find((t) => t.id === id);

  const [date, setDate] = useState(transaction ? transaction.date : "");
  const [category, setCategory] = useState(
    transaction ? transaction.category : "Shopping"
  );
  const [description, setDescription] = useState(
    transaction ? transaction.description : ""
  );
  const [amount, setAmount] = useState(
    transaction ? Math.abs(transaction.amount) : ""
  );
  const [receipt, setReceipt] = useState(null);
  const [isExpense, setIsExpense] = useState(
    transaction ? transaction.transactionType === "expense" : true
  );
  //   useEffect(() => {
  //     if (!transaction) {
  //       navigate("/");
  //     }
  //   }, [transaction, navigate]);

  const handleSave = () => {
    if (!date || !category || !description || !amount) {
      showErrorToast("Vui lòng nhập đầy đủ")
      return;
    }
    console.log(states);
    console.log(amount);
    const updatedTransaction = {
      id,
      updatedData: {
        date,
        category,
        description,
        amount: isExpense ? -amount : amount,
        receipt,
        transactionType: isExpense ? "expense" : "income",
      },
    };

    dispatch(updateTransaction(updatedTransaction));
    showSuccessToast("Sửa thành công")
    navigate("/");
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
    showSuccessToast("Xóa thành công !")
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full  h-[100vh] bg-white relative border-black border-2">
        <Header  />
        <div className="px-4 py-6 space-y-4 text-[14px] font-bold  xl:w-[70vw] md:mx-auto">
          <div className="flex border rounded-[15px]  h-[32px] md:h-[60px] md:rounded-full bg-[#D9D9D9]">
            <button
              className={`flex-1 h-full rounded-l-full md:text-2xl ${
                isExpense
                  ? "bg-[#42224A] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setIsExpense(true)}
            >
              Expense
            </button>
            <button
              className={`flex-1 h-full rounded-r-[15px]  md:text-2xl${
                !isExpense
                  ? "bg-[#42224A] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setIsExpense(false)}
            >
              Income
            </button>
          </div>

          <div>
            <input
              type="date"
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:text-2xl md:ps-5 md:rounded-full bg-[#D9D9D9] font-bold text-[14px] px-3 "
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <select
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:text-2xl md:ps-5 md:rounded-full bg-[#D9D9D9] font-bold text-[14px] px-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {transactionTypes.map((item) => (
                <option key={item.type} value={item.type}>
                  {item.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:text-2xl md:ps-5 md:rounded-full bg-[#D9D9D9] font-bold text-[14px] px-3 "
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:text-2xl  md:ps-5 md:rounded-full bg-[#D9D9D9] font-bold text-[14px] px-3 "
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              Expense Receipt Image
            </label>
            <input
              type="file"
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:text-2xl md:ps-5 md:rounded-full bg-[#D9D9D9] font-bold text-[14px] px-3 "
              onChange={(e) => setReceipt(e.target.files[0])}
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleDelete}
              className="w-[48%] h-[32px] md:h-[60px] md:rounded-full md:text-2xl md:ps-5 bg-[#42224A] rounded-[15px] font-bold text-[14px] text-white"
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              className="w-[48%] h-[32px] md:h-[60px] md:rounded-full md:text-2xl md:ps-5 bg-[#42224A] rounded-[15px] font-bold text-[14px] text-white"
            >
              Save
            </button>
          </div>
        </div>
        <Menu className="absolute bottom-0 left-0 w-full"></Menu>
      </div>
    </div>
  );
}

export default UpdatePage;
