import React from "react";
import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Menu from "../layout/Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../component/ExpenseItem";
import ExpenseList from "../component/ExpenseList";
function HomePage() {
  const balance = useSelector((state) => state.transactions.totalBalance);
  const [filter, setFilter] = useState("today");

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-[360px] h-[90vh] bg-white relative border-black border-2">
        <div className=" h-full px-[18px] py-[22px]">
          <div>
            <p className="font-sans font-normal text-[16px] text-black">
              Balance
            </p>
            <div className="flex items-center text-[#42224A]">
              <DollarOutlined className="text-xl mr-2" />
              <span className="font-extrabold text-[36px]">
                {balance !== null ? formatCurrency(balance) : "0.00"}
              </span>{" "}
            </div>
          </div>
          <div className="w-[314px] h-[189px]  bg-gray-200 rounded-[10px]"></div>
          <div>
            <div className="flex justify-between mt-2">
              <button
                className={`h-[32px] w-[101px] ${
                  filter === "today" ? "bg-[#CFBBD4]" : "bg-[#EEEFEF]"
                } text-[#1E1E1E] rounded-[15px] text-sm font-medium`}
                onClick={() => handleFilterChange("today")}
              >
                Today
              </button>

              <button
                className={`h-[32px] w-[101px] ${
                  filter === "weekly" ? "bg-[#CFBBD4]" : "bg-[#EEEFEF]"
                } text-[#1E1E1E] rounded-[15px] text-sm font-medium`}
                onClick={() => handleFilterChange("weekly")}
              >
                Weekly
              </button>

              <button
                className={`h-[32px] w-[101px] ${
                  filter === "monthly" ? "bg-[#CFBBD4]" : "bg-[#EEEFEF]"
                } text-[#1E1E1E] rounded-[15px] text-sm font-medium`}
                onClick={() => handleFilterChange("monthly")}
              >
                Monthly
              </button>
            </div>
            <div className="mt-4 flex-1 overflow-y-auto max-h-[240px] ">
              <ExpenseList filter={filter} />
            </div>
          </div>
          {/* <div className="flex justify-between mt-2">
            <button className="h-[32px] w-[101px] bg-[#CFBBD4] text-[#1E1E1E] rounded-[15px] text-sm font-medium">
              Today
            </button>

            <button className="h-[32px] w-[101px] bg-[#EEEFEF] text-[#1E1E1E] rounded-[15px] text-sm font-medium">
              Weekly
            </button>

            <button className="h-[32px] w-[101px] bg-[#EEEFEF] text-[#1E1E1E] rounded-[15px] text-sm font-medium">
              Monthly
            </button>
          </div>
          <div className="mt-4 flex-1 overflow-y-auto max-h-[240px] ">
            <ExpenseList></ExpenseList>
          </div> */}
        </div>
        <Menu className="absolute bottom-0 left-0 w-full"></Menu>
      </div>
    </div>
  );
}

export default HomePage;
