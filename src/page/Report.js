import React from "react";
import Menu from "../layout/Menu";
import Header from "../layout/Header";
import PieStatistic from "../component/PieStatistic";
import { useState } from "react";
import { PieStatisticMonth } from "../component/ChartStatistic";
import FilterContainer from "../component/FilterMonth";
function Report() {
  const [selectedMonth, setSelectedMonth] = useState("Nov"); 


  const handleFilter = (month) => {
      setSelectedMonth(month); 
      console.log(selectedMonth)
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full  h-[100vh] bg-white relative border-black border-2">
        <Header isUpdate={false} />
        <div className="px-4 py-6 space-y-4 text-[14px] font-bold flex flex-col justify-around sm:flex-row items-start ">
          {/* Toggle Expense/Income */}
          <div className=" flex justify-center ">
            <div className="flex flex-col justify-center ">
              <p className="text-center mb-5 text-2xl">Total Expense</p>
              <PieStatistic></PieStatistic>
            </div>
          </div>
          <div className=" flex justify-center mt-0 ">
            <div className="flex flex-col ">
            <p className="text-center mb-5 text-2xl">Monthly Expense</p>
              <div className="filter-container flex justify-center">
              <FilterContainer onFilter={handleFilter} />
              </div>
              <PieStatisticMonth month={selectedMonth} />
            </div>
          </div>
        </div>
        <Menu className="absolute bottom-0 left-0 w-full"></Menu>
      </div>
    </div>
  );
}

export default Report;
