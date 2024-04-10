import React from 'react';
import Chart from 'chart.js/auto';
import { Bar, Doughnut, Line, Pie,  } from 'react-chartjs-2';
import ApexChart from "@/Components/ApexChart";

function Graphs(props) {
  const calculateCategoryTotalPrices = (expenses) => {
    const categoryTotals = {};

    expenses.forEach((expense) => {
      const { category, price } = expense;

      if (categoryTotals[category] === undefined) {
        // If category is not in the mapping, initialize it
        categoryTotals[category] = price;
      } else {
        // If category is already in the mapping, add the price
        categoryTotals[category] += price;
      }
    });

    // Convert the mapping to an array of objects
    const categoryTotalArray = Object.entries(categoryTotals).map(([category, total]) => ({
      category,
      total,
    }));

    return categoryTotalArray;
  };

  const result = calculateCategoryTotalPrices(props.expenses);

  const categories = result.map((item) => item.category);
  const totals = result.map((item) => item.total)

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Monthly Expenses',
      data: [500, 600, 800, 810, 560, 550],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        // More colors as needed
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        // More borders as needed
      ],
      borderWidth: 1,
    }],
  };


  return (
    <div className='flex flex-col sm:flex-row sm:px-11 sm:gap-5 sm:py-4 '>
      <div className='w-full h-70 p-4 sm:w-7/12 bg-white rounded-md'>
      <ApexChart expenses={props.expenses}/>
      </div>
      <div className='w-full sm:w-5/12 bg-white rounded-md'>
        <div className='flex'>
          <div className='w-[60%] mt-6'>
            <Pie
              data={{
                labels: categories,
                datasets: [
                  {
                    label: 'Biggest Expense',
                    data: totals,
                  },
                ],
              }}
            />
          </div>
          <div className='p-3 flex flex-col justify-center'>
            {result.map((item, index) => (
              <div key={index}>
                {item.category}: {item.total}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphs;
