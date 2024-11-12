import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import { addTransaction } from "../redux-toolkit/transaction";
import { v4 as uuidv4 } from 'uuid';
import Header from "../layout/Header";
import Menu from "../layout/Menu";

function ExpensePage() {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Shopping");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);  
  const [isExpense, setIsExpense] = useState(true);  

  const handleSave = () => {
    if (!date || !category || !description || !amount) {
      alert("Please fill out all fields.");
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      date,
      category,
      description,
      amount: parseFloat(amount),
      receipt,
      transactionType: isExpense ? 'expense' : 'income',  
    };

    dispatch(addTransaction(newTransaction));

    setDate("");
    setCategory("Shopping");
    setDescription("");
    setAmount("");
    setReceipt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-[360px] h-[90vh] bg-white relative border-black border-2">
        <Header />
        <div className="px-4 py-6 space-y-4 text-[14px] font-bold">
          {/* Toggle Expense/Income */}
          <div className="flex border rounded-[15px] h-[32px] bg-[#D9D9D9]">
            <button
              className={`flex-1 h-full rounded-l-[15px] ${
                isExpense ? "bg-[#42224A] text-white" : "bg-transparent text-black"
              }`}
              onClick={() => setIsExpense(true)} 
            >
              Expense
            </button>
            <button
              className={`flex-1 h-full rounded-r-[15px] ${
                !isExpense ? "bg-[#42224A] text-white" : "bg-transparent text-black"
              }`}
              onClick={() => setIsExpense(false)} 
            >
              Income
            </button>
          </div>

          <div>
            <input
              type="date"
              className="w-full rounded-[15px] h-[32px] bg-[#D9D9D9] font-bold text-[14px] px-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <select
              className="w-full rounded-[15px] h-[32px] bg-[#D9D9D9] font-bold text-[14px] px-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Shopping</option>
              <option>Bill</option>
              <option>Salary</option>
              <option>Food</option>
              <option>Entertainment</option>
            </select>
          </div>

          {/* Description Input */}
          <div>
            <input
              type="text"
              className="w-full rounded-[15px] h-[32px] bg-[#D9D9D9] font-bold text-[14px] px-3"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Amount Input */}
          <div>
            <input
              type="number"
              className="w-full rounded-[15px] h-[32px] bg-[#D9D9D9] font-bold text-[14px] px-3"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="text-sm font-semibold">Expense Receipt Image</label>
            <input
              type="file"
              className="w-full rounded-[15px] h-[32px] bg-[#D9D9D9] font-bold text-[14px] px-3"
              onChange={(e) => setReceipt(e.target.files[0])}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button className="w-[48%] h-[32px] bg-[#42224A] rounded-[15px] font-bold text-[14px] text-white">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-[48%] h-[32px] bg-[#42224A] rounded-[15px] font-bold text-[14px] text-white"
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

export default ExpensePage;
