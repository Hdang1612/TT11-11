import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
const ExpenseItem = ({ icon, name, description, amount }) => {
  return (
    <div className="flex items-center mb-3 p-2 rounded-lg">
      <div
        className={`w-[47px] h-[47px] flex items-center justify-center rounded-full text-black bg-[#CFBBD4]`}
        
      >
        {/* {icon} */}
        <ShoppingCartOutlined className="text-[20px]"></ShoppingCartOutlined>
      </div>
      <div className="ml-3">
        <p className="text-[16px] font-regular text-[#000000]">{name}</p>
        <p className="text-[12px] font-semibold text-[#AEABAB]">
          {description}
        </p>
      </div>
      <div className="ml-auto text-[16px] font-semibold text-[#000000]"> 
        ${amount}
      </div>
    </div>
  );
};

export default ExpenseItem;
