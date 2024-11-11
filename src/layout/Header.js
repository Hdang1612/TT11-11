import React from "react";
import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons"; // Import các icon từ ant-design
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="flex justify-between items-center px-[24px] py-3 bg-transparent text-black ">
      <Link to="/" className="flex items-center">
        <ArrowLeftOutlined className="text-xl" />
      </Link>

      <h1 className="text-[14px] font-bold">Add New Expense</h1>

      <button className="flex items-center">
        <SettingOutlined className="text-xl" />
      </button>
    </div>
  );
}

export default Header;
