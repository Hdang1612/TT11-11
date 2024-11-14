import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2"; // Biểu đồ cột
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { groupByMonth ,calculateMonthlyTotals } from "../../untils/filterTransaction";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const PieStatisticMonth = ({ month }) => {
  const transactions = useSelector(
    (state) => state.transactions.transactions || []
  );

  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const monthlyTotals = calculateMonthlyTotals(transactions);
    const selectedMonth = monthlyTotals.find((item) => item.month === month) || {
      income: 0,
      expense: 0,
    };
    console.log("transactions :" ,transactions)
    console.log("selected month :" , selectedMonth)
    console.log(monthlyTotals)

    const data = {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [selectedMonth.income, selectedMonth.expense],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)", // Income màu xanh
            "rgba(255, 99, 132, 0.6)", // Expense màu đỏ
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    setPieData(data);
  }, [transactions, month]);

  return (
    <div style={{ width: "300px", height: "300px" }}>
      {pieData.labels ? (
        <Pie data={pieData} options={{ responsive: true }} />
      ) : (
        <p>Loading pie chart data...</p>
      )}
    </div>
  );
};