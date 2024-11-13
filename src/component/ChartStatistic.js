import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Biểu đồ cột
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

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartStatistic = () => {
  const groupedTransactions = useSelector(
    (state) => state.transactions.groupedTransactions?.monthly || {}
  );

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const monthlyStats = groupedTransactions?.stats || {};
    console.log("Monthly Stats: ", monthlyStats);
    if (Object.keys(monthlyStats).length > 0) {
      const labels = [];
      const incomeData = [];
      const expenseData = [];
      const balanceData = [];

      // Tạo danh sách các tháng từ tháng 1 đến tháng 12
      const allMonths = [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
        "Jul 2024",
        "Aug 2024",
        "Sep 2024",
        "Oct 2024",
        "Nov 2024",
        "Dec 2024",
      ];

      allMonths.forEach((month) => {
        labels.push(month.split(" ")[0]);

        // Lấy thông tin thống kê từ tháng trong dữ liệu monthlyStats
        const stats = monthlyStats[month]
          ? monthlyStats[month]
          : {
              income: 0,
              expense: 0,
              balance: 0,
            };

        incomeData.push(stats.income);
        expenseData.push(stats.expense);
        balanceData.push(stats.balance);
      });

      console.log("Income Data: ", incomeData);
      console.log("Expense Data: ", expenseData);
      console.log("Balance Data: ", balanceData);
      console.log("label: ", labels);

      setChartData({
        labels,
        datasets: [
          // {
          //   label: "Income",
          //   data: incomeData,
          //   backgroundColor: "rgba(75, 192, 192, 0.6)", // Màu nền cho cột thu nhập
          //   borderColor: "rgba(75, 192, 192, 1)", // Đường viền cột thu nhập
          //   borderWidth: 1,
          // },
          // {
          //   label: "Expense",
          //   data: expenseData,
          //   backgroundColor: "rgba(255, 99, 132, 0.6)", // Màu nền cho cột chi tiêu
          //   borderColor: "rgba(255, 99, 132, 1)", // Đường viền cột chi tiêu
          //   borderWidth: 1,
          // },
          {
            label: "Balance",
            data: balanceData,
            backgroundColor: "rgba(153, 102, 255, 0.6)", // Màu nền cho cột số dư
            borderColor: "rgba(153, 102, 255, 1)", // Đường viền cột số dư
            borderWidth: 1,
          },
        ],
      });
    }
    console.log(chartData);
  }, [groupedTransactions]);

  return (
    <div>
      {chartData.labels && chartData.datasets ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Ensures chart scales with the container
            scales: {
              y: {
                display: false, // Hides the Y-axis
              },
            },
          }}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default ChartStatistic;
