import React from 'react'
import { BellOutlined,InfoCircleOutlined,PlusOutlined,BarChartOutlined,HomeOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
function Menu() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-[#EDEDED]  shadow-lg z-50 py-1 px-5 md:px-[120px]  ">
      <div className="flex justify-between items-center ">
        
        <Link to="/reminder" className="flex flex-col items-center md:py-3">
          <BellOutlined className="text-xl md:text-[24px]" />
          <span className="text-[10px] sm:text-xl">Reminder</span>
        </Link>

        <Link to="/receipt" className="flex flex-col items-center md:py-3">
          <InfoCircleOutlined className="text-xl md:text-[24px]" />
          <span className="text-[10px] sm:text-xl">Receipt</span>
        </Link>

        <div className="relative flex flex-col items-center justify-center">
          <Link to="/add-expense" className="absolute bottom-0 -translate-y-[0px] md:translate-y-[-10px] ">
            <div className="w-[49px] h-[49px] md:w-[70px] md:h-[70px] bg-[#EF8767] rounded-full flex items-center justify-center shadow-lg">
              <PlusOutlined className="text-[#42224A] font-bold text-3xl" />
            </div>
          </Link>
        </div>

        <Link to="/statistics" className="flex flex-col items-center md:py-3">
          <BarChartOutlined className="text-xl md:text-[24px]" />
          <span className="text-[10px] sm:text-xl">Statistic</span>
        </Link>

        <Link to="/" className="flex flex-col items-center md:py-3">
          <HomeOutlined className="text-xl md:text-[24px] " />
          <span className="text-[10px] sm:text-xl">Home</span>
        </Link>
        
      </div>
    </div>
  );
}

export default Menu