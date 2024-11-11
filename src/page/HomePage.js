import React from "react";
import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Menu from "../layout/Menu";
function HomePage() {
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
            <span className="font-extrabold text-[36px]">1,000</span>{" "}
          </div>
        </div>
        <div className="w-[314px] h-[189px]  bg-gray-200 rounded-[10px]"></div>
        <div className="flex justify-between mt-2">
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
          <p className="text-[16px] text-[#000000]">Today</p>
          <div className="flex items-center mb-3 p-2  rounded-lg">
            <div className="w-[47px] h-[47px] flex items-center justify-center bg-[#CFBBD4] rounded-full text-black">
              <ShoppingCartOutlined className="text-[20px]" />
            </div>
            <div className="ml-3">
              <p className="text-[16px] font-regular text-[#000000]">Name</p>
              <p className="text-[12px] font-semibold text-[#AEABAB]">
                Description
              </p>
            </div>
            <div className="ml-auto text-[16px] font-semibold text-[#000000]">
              $100
            </div>
          </div>
          
        </div>
      </div>
      <Menu className="absolute bottom-0 left-0 w-full"></Menu>
    </div>
    </div>
    
  );
}

export default HomePage;
