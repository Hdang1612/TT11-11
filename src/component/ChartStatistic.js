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

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const ChartStatisticIncome = () => {
  const groupedTransactions = useSelector(
    (state) => state.transactions.groupedTransactions?.monthly || {}
  );

  const [incomeData, setIncomeData] = useState({});

  useEffect(() => {
    const monthlyStats = groupedTransactions?.stats || {};
    const labels = [];
    const incomeData = [];

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

      const stats = monthlyStats[month] || { income: 0 };
      incomeData.push(stats.income);
    });

    setIncomeData({
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [groupedTransactions]);

  return (
    <div>
      {incomeData.labels && incomeData.datasets ? (
        <Bar
          data={incomeData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                display: false,
              },
            },
          }}
        />
      ) : (
        <p>Loading income data...</p>
      )}
    </div>
  );
};
export const ChartStatisticExpense = () => {
  const groupedTransactions = useSelector(
    (state) => state.transactions.groupedTransactions?.monthly || {}
  );

  const [expenseData, setExpenseData] = useState({});

  useEffect(() => {
    const monthlyStats = groupedTransactions?.stats || {};
    const labels = [];
    const expenseData = [];

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

      const stats = monthlyStats[month] || { expense: 0 };
      expenseData.push(stats.expense);
    });

    setExpenseData({
      labels,
      datasets: [
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [groupedTransactions]);

  return (
    <div>
      {expenseData.labels && expenseData.datasets ? (
        <Bar
          data={expenseData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                display: false,
              },
            },
          }}
        />
      ) : (
        <p>Loading expense data...</p>
      )}
    </div>
  );
};

export const ChartStatisticBalance = () => {
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

      //   console.log("Income Data: ", incomeData);
      //   console.log("Expense Data: ", expenseData);
      //   console.log("Balance Data: ", balanceData);
      //   console.log("label: ", labels);

      setChartData({
        labels,
        datasets: [
          {
            label: "Balance",
            data: balanceData,
            backgroundColor: "#42224A", // Màu nền cho cột số dư
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

export const PieStatisticMonth = ({ month }) => {
  const groupedTransactions = useSelector(
    (state) => state.transactions.groupedTransactions?.monthly || {}
  );
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const monthlyStats = groupedTransactions?.stats || {};
    const stats = monthlyStats[month + " 2024"] || { income: 0, expense: 0 };
    // console.log("data:", monthlyStats);
    // console.log(stats);
    const data = {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [stats.income, stats.expense],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };

    setPieData(data);
  }, [groupedTransactions, month]);

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
