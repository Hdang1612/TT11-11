import React from 'react'
import { BellOutlined,InfoCircleOutlined,PlusOutlined,BarChartOutlined,HomeOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
function Menu() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-[#EDEDED] h-[42px] shadow-lg z-50 py-1 px-3 ">
      <div className="flex justify-between items-center ">
        
        <Link to="/reminder" className="flex flex-col items-center">
          <BellOutlined className="text-xl" />
          <span className="text-[10px]">Reminder</span>
        </Link>

        <Link to="/receipt" className="flex flex-col items-center">
          <InfoCircleOutlined className="text-xl" />
          <span className="text-[10px]">Receipt</span>
        </Link>

        <div className="relative flex flex-col items-center justify-center">
          <Link to="/add-expense" className="absolute bottom-0 -translate-y-[0px]">
            <div className="w-[49px] h-[49px] bg-[#EF8767] rounded-full flex items-center justify-center shadow-lg">
              <PlusOutlined className="text-[#42224A] font-bold text-3xl" />
            </div>
          </Link>
        </div>

        <Link to="/statistics" className="flex flex-col items-center">
          <BarChartOutlined className="text-xl" />
          <span className="text-[10px]">Statistic</span>
        </Link>

        <Link to="/" className="flex flex-col items-center">
          <HomeOutlined className="text-xl" />
          <span className="text-[10px]">Home</span>
        </Link>
        
      </div>
    </div>
  );
}

export default Menu