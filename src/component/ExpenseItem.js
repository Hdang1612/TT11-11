import React from "react";
import { ShoppingCartOutlined, FileTextOutlined, DollarCircleOutlined, GiftOutlined,FileUnknownOutlined } from '@ant-design/icons';
import { formatCurrency } from "../untils/number";
export const transactionTypes = [
  { type: 'Shopping', icon: <ShoppingCartOutlined /> },
  { type: 'Bill', icon: <FileTextOutlined /> },
  { type: 'Salary', icon: <DollarCircleOutlined /> },
  { type: 'Food', icon: <GiftOutlined /> },
  { type: 'Entertainment', icon: <ShoppingCartOutlined /> }, 
  { type: 'Unknown', icon: <FileUnknownOutlined /> },
];

const ExpenseItem = ({ name, description, amount }) => {
  const transactionType = transactionTypes.find(type => type.type === name);
  const icon = transactionType ? transactionType.icon : null; 

  return (
    <div className="flex items-center  p-2 rounded-lg">
      <div
        className={`w-[47px] h-[47px] flex items-center justify-center rounded-full text-black bg-[#CFBBD4] text-[20px] md:w-[70px] md:h-[70px] md:text-[30px]  `}
        
      >
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-[16px] md:text-2xl font-regular text-[#000000]">{name}</p>
        <p className="text-[12px] md:text-xl font-semibold text-[#AEABAB]">
          {description}
        </p>
      </div>
      <div className="ml-auto text-[16px] md:text-2xl font-semibold text-[#000000]"> 
        {formatCurrency(amount)}
      </div>
    </div>
  );
};




export default ExpenseItem;
