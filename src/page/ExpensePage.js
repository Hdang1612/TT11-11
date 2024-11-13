import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import { addTransaction } from "../redux-toolkit/transaction";
import { v4 as uuidv4 } from "uuid";
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import { transactionTypes } from "../component/ExpenseItem";
import { showSuccessToast, showErrorToast } from "../component/Toaste.js";
import { Link } from "react-router-dom";
function ExpensePage() {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Shopping");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [isExpense, setIsExpense] = useState(true);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Lấy ngày theo định dạng yyyy-mm-dd
    setDate(formattedDate);
  }, []);

  const handleSave = () => {
    if (!date || !category || !amount) {
      showErrorToast("Vui lòng nhập đầy đủ");
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      date,
      category,
      description,
      amount: isExpense ? -amount : +amount,
      receipt,
      transactionType: isExpense ? "expense" : "income",
    };

    dispatch(addTransaction(newTransaction));
    showSuccessToast("Thêm thành công");
    setDate("");
    setCategory("Shopping");
    setDescription("");
    setAmount("");
    setReceipt(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full  h-[100vh] bg-white relative border-black border-2">
        <Header />
        <div className="px-4 py-6 space-y-4 text-[14px] font-bold xl:w-[70vw] md:mx-auto">
          {/* Toggle Expense/Income */}
          <div className="flex border rounded-[15px] h-[32px] md:h-[60px] md:rounded-full bg-[#D9D9D9]">
            <button
              className={`flex-1 h-full rounded-l-full md:h-[60px] md:text-2xl  ${
                isExpense
                  ? "bg-[#EF8767] text-white"
                  : "bg-transparent text-black"
              }`}
              onClick={() => setIsExpense(true)}
            >
              Expense
            </button>
            <button
              className={`flex-1 h-full rounded-r-[15px] md:h-[60px] md:rounded-r-full md:text-2xl  ${
                !isExpense
                  ? "bg-[#EF8767] text-white"
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
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:rounded-full md:text-2xl md:ps-5 bg-[#D9D9D9] font-bold text-[14px] px-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <select
            className="w-full rounded-[15px] h-[32px] md:h-[60px] md:rounded-full md:text-2xl md:ps-5 bg-[#D9D9D9] font-bold text-[14px] px-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {transactionTypes.map((item) => (
              <option key={item.type} value={item.type}>
                {item.type}
              </option>
            ))}
          </select>

          <div>
            <input
              type="text"
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:rounded-full md:text-2xl md:ps-5 bg-[#D9D9D9] font-bold text-[14px] px-3"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:rounded-full md:text-2xl md:ps-5 bg-[#D9D9D9] font-bold text-[14px] px-3"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="text-sm font-semibold md-text-xl">
              Expense Receipt Image
            </label>
            <input
              type="file"
              className="w-full rounded-[15px] h-[32px] md:h-[60px] md:rounded-full md:text-2xl md:ps-5 bg-[#D9D9D9] font-bold text-[14px] px-3"
              onChange={(e) => setReceipt(e.target.files[0])}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <Link to="/" className="w-[48%] h-[32px] bg-[#CFBBD4] rounded-[15px] md:h-[60px] md:rounded-full md:text-2xl font-bold text-[14px] text-black flex items-center justify-center text-center ">
              Cancel
            </Link>
            <button
              onClick={handleSave}
              className="w-[48%] h-[32px] bg-[#EF8767] rounded-[15px] md:h-[60px] md:rounded-full md:text-2xl font-bold text-[14px] text-white"
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
