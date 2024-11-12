import React from "react";
import { ShoppingCartOutlined, FileTextOutlined, DollarCircleOutlined, GiftOutlined,FileUnknownOutlined } from '@ant-design/icons';
export const formatCurrency= (amount) => {
  return amount.toLocaleString('vi-VN', {
    style: 'decimal', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0, 
  });
}

export const transactionTypes = [
  { type: 'Shopping', icon: <ShoppingCartOutlined /> },
  { type: 'Bill', icon: <FileTextOutlined /> },
  { type: 'Salary', icon: <DollarCircleOutlined /> },
  { type: 'Food', icon: <GiftOutlined /> },
  { type: 'Entertainment', icon: <ShoppingCartOutlined /> }, // Có thể thay đổi icon tùy theo nhu cầu
  { type: 'Unknown', icon: <FileUnknownOutlined /> }, // Có thể thay đổi icon tùy theo nhu cầu
];

const ExpenseItem = ({ name, description, amount }) => {
  const transactionType = transactionTypes.find(type => type.type === name);
  const icon = transactionType ? transactionType.icon : null; 

  return (
    <div className="flex items-center  p-2 rounded-lg">
      <div
        className={`w-[47px] h-[47px] flex items-center justify-center rounded-full text-black bg-[#CFBBD4] text-[20px] `}
        
      >
        {icon}
        {/* <ShoppingCartOutlined className="text-[20px]"></ShoppingCartOutlined> */}
      </div>
      <div className="ml-3">
        <p className="text-[16px] font-regular text-[#000000]">{name}</p>
        <p className="text-[12px] font-semibold text-[#AEABAB]">
          {description}
        </p>
      </div>
      <div className="ml-auto text-[16px] font-semibold text-[#000000]"> 
        {formatCurrency(amount)}
      </div>
    </div>
  );
};




export default ExpenseItem;
