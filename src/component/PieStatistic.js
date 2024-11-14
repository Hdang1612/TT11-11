// GeneralReport.js
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"; // Biểu đồ tròn
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieStatistic = () => {
  const { totalIncome, totalExpense } = useSelector(
    (state) => state.transactions
  );

  const [chartData, setChartData] = useState({});
  const [options, setOptions] = useState({});

  useEffect(() => {
    // console.log(totalIncome)
    // console.log(totalExpense)
    setChartData({
      labels: ["Income", "Expense"],
      datasets: [
        {
          label: "Income vs Expense",
          data: [totalIncome, totalExpense],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)", // Màu cho thu nhập
            "rgba(255, 99, 132, 0.6)", // Màu cho chi tiêu
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)", // Đường viền cho thu nhập
            "rgba(255, 99, 132, 1)", // Đường viền cho chi tiêu
          ],
          borderWidth: 1,
        },
      ],
    });

    setOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    });
  }, [totalIncome, totalExpense]);

  return (
    <div>
      {chartData.labels && chartData.datasets ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p>Loading expense data...</p>
      )}
    </div>
  );
};

export default PieStatistic;
