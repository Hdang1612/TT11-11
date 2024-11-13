import React from "react";
import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Menu from "../layout/Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../component/ExpenseItem";
import ExpenseList from "../component/ExpenseList";
import {
  ChartStatisticBalance,
  ChartStatisticExpense,
  ChartStatisticIncome,
} from "../component/ChartStatistic";
function HomePage() {
  const balance = useSelector((state) => state.transactions.totalBalance);
  const [filter, setFilter] = useState("today");

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full  h-[100vh] bg-white relative ">
        <div className="h-full px-4 py-5 sm:px-[18px] sm:py-[22px] ">
          <div>
            <p className="font-sans font-normal text-[16px] text-black md:text-2xl">
              Balance
            </p>
            <div className="flex items-center text-[#42224A]">
              <DollarOutlined className="text-xl mr-2" />
              <span className="font-extrabold text-[28px] sm:text-[46px] ">
                {balance !== null ? formatCurrency(balance) : "0.00"}
              </span>
            </div>
          </div> 
          <div className="statistic-container w-full h-[120px] sm:h-[200px] flex gap-4 ">
          <div className=" w-full block bg-gray-200 rounded-[10px] mt-4 md:w-1/3 ">
            <ChartStatisticBalance className="h-max-200"></ChartStatisticBalance>
          </div>
          <div className="hidden md:block bg-gray-200 rounded-[10px] mt-4 md:w-1/3 ">
            <ChartStatisticIncome className="h-max-200"></ChartStatisticIncome>
          </div>
          <div className="hidden md:block bg-gray-200 rounded-[10px] mt-4 md:w-1/3 ">
            <ChartStatisticExpense className="h-max-200"></ChartStatisticExpense>
          </div>

          </div>
          <div>
            <div className="flex justify-between mt-4 gap-2 md:gap-5 ">
              <button
                className={`flex-1   ${
                  filter === "today" ? "bg-[#CFBBD4]" : "bg-[#EEEFEF]"
                } text-[#1E1E1E] rounded-[15px] text-sm font-medium md:text-xl md:py-1`}
                onClick={() => handleFilterChange("today")}
              >
                Today
              </button>

              <button
                className={`flex-1   ${
                  filter === "weekly" ? "bg-[#CFBBD4]" : "bg-[#EEEFEF]"
                } text-[#1E1E1E] rounded-[15px] text-sm font-medium md:text-xl md:py-1`}
                onClick={() => handleFilterChange("weekly")}
              >
                Weekly
              </button>

              <button
                className={`flex-1   ${
                  filter === "monthly" ? "bg-[#CFBBD4]" : "bg-[#EEEFEF]"
                } text-[#1E1E1E] rounded-[15px] text-sm font-medium md:text-xl md:py-1`}
                onClick={() => handleFilterChange("monthly")}
              >
                Monthly
              </button>
            </div>
            <div className="mt-4  flex-1  overflow-y-auto">
              <ExpenseList filter={filter} />
            </div>
          </div>
        </div>
        <Menu className="absolute bottom-0 left-0 w-full "></Menu>
      </div>
    </div>
  );
}

export default HomePage;
