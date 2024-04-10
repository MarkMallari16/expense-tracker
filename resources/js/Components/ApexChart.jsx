import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const ApexChart = ({ expenses }) => {
    const [selectedOption, setSelectedOption] = useState('Today');
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const currentDate = new Date();
        let filteredData = [];

        switch (selectedOption) {
            case 'Yesterday':
                filteredData = expenses.filter((expense) => {
                    const expenseDate = new Date(expense.created_at);
                    const yesterday = new Date(currentDate);
                    yesterday.setDate(currentDate.getDate() - 1);
                    return expenseDate.toDateString() === yesterday.toDateString();
                });
                break;
            case 'Today':
                filteredData = expenses.filter((expense) => {
                    const expenseDate = new Date(expense.created_at);
                    return expenseDate.toDateString() === currentDate.toDateString();
                });
                break;
            case 'Last 7 days':
                filteredData = expenses.filter((expense) => {
                    const expenseDate = new Date(expense.created_at);
                    const diffTime = Math.abs(currentDate - expenseDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 7;
                });
                break;
            case 'Last 30 days':
                filteredData = expenses.filter((expense) => {
                    const expenseDate = new Date(expense.created_at);
                    const diffTime = Math.abs(currentDate - expenseDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 30;
                });
                break;
            case 'Last 90 days':
                filteredData = expenses.filter((expense) => {
                    const expenseDate = new Date(expense.created_at);
                    const diffTime = Math.abs(currentDate - expenseDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 90;
                });
                break;
            default:
                filteredData = expenses;
        }

        // Prepare chart data based on filter option
        let chartData = [];
        if (selectedOption === 'Today' || selectedOption === 'Yesterday') {
            chartData = filteredData.map(expense => ({
                x: new Date(expense.created_at).getTime(),
                y: expense.price
            }));
        } else {
            const aggregatedExpenses = {};
            filteredData.forEach(expense => {
                const date = new Date(expense.created_at).toDateString();
                if (aggregatedExpenses[date]) {
                    aggregatedExpenses[date] += expense.price;
                } else {
                    aggregatedExpenses[date] = expense.price;
                }
            });
            chartData = Object.keys(aggregatedExpenses).map(date => ({
                x: new Date(date).getTime(),
                y: aggregatedExpenses[date]
            }));
        }

        // Render chart
        if (chartRef.current && chartData.length > 0) {
            renderChart(chartData);
        }
    }, [selectedOption, expenses]);

    const renderChart = (data) => {
        const options = {
            chart: {
                height: "100%",
                maxWidth: "100%",
                type: "area",
                fontFamily: "Inter, sans-serif",
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: "#1C64F2",
                    gradientToColors: ["#1C64F2"],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 6,
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: 0
                },
            },
            series: [
                {
                    name: "Expenses",
                    data: data,
                    color: "#FF0000",
                },
            ],
            xaxis: {
                type: "datetime",
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
        };

        try {
            // Check if chartRef.current is available
            if (chartRef.current) {
                // Destroy existing chart instance if it exists
                if (chartRef.current.chart) {
                    chartRef.current.chart.destroy();
                }
                // Create new chart instance
                chartRef.current.chart = new ApexCharts(chartRef.current, options);
                // Render the chart with new data
                chartRef.current.chart.render();
            }
        } catch (error) {
            console.error("Error rendering chart:", error);
        }
    };

    const handleFilterChange = (e) => {
        setSelectedOption(e.target.value);
        setChartData([]); // Clear chart data to force re-render
    };
    console.log(chartData)

    return (
        <div className="w-full bg-white rounded-lg  dark:bg-gray-800 p-2 md:p-6">
           
            <div ref={chartRef} className='w-full'></div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                <div className="flex justify-between items-center pt-5">
                <div className='text-lg font-medium'>Expense Statistics</div>
                    <div className="relative">
                        <select
                            value={selectedOption}
                            onChange={handleFilterChange}
                            className="block w-full py-2 pl-3 pr-10 foc border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="Yesterday">Yesterday</option>
                            <option value="Today">Today</option>
                            <option value="Last 7 days">Last 7 days</option>
                            <option value="Last 30 days">Last 30 days</option>
                            <option value="Last 90 days">Last 90 days</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 20a9.93 9.93 0 01-6.97-2.89c-.3-.31-.61-.63-.88-.97a.794.794 0 01-.11-.1l-.07-.07c-.13-.15-.26-.31-.39-.47l-.08-.11c-.14-.19-.28-.38-.4-.58l-.05-.1c-.12-.2-.23-.41-.33-.62l-.04-.1c-.1-.21-.2-.42-.29-.64l-.02-.05c-.09-.23-.17-.46-.24-.69l-.03-.08c-.06-.23-.11-.46-.16-.69 0-.03-.01-.05-.01-.08-.05-.24-.09-.48-.12-.72 0-.07-.01-.15-.01-.22 0-.27.01-.55.04-.83l.01-.11c.01-.14.03-.28.05-.42l.01-.07c.02-.17.05-.33.09-.5l.02-.07c.03-.12.07-.24.11-.37l.02-.07c.03-.1.07-.21.11-.31l.02-.06c.04-.12.09-.23.14-.35l.03-.06c.06-.15.12-.3.19-.44l.03-.06c.12-.27.26-.54.41-.8l.07-.11c.1-.14.21-.27.32-.4l.06-.06c.17-.2.35-.39.54-.57l.1-.09c.15-.14.31-.27.47-.4l.1-.07c.31-.25.65-.46 1-.64l.12-.06c.34-.18.69-.32 1.04-.43l.1-.03h.12c.34-.08.68-.13 1.03-.13s.69.05 1.03.13h.13l.1.03c.36.11.7.25 1.04.43l.13.06c.25.11.5.24.75.38l.08.06c.28.23.53.48.76.75l.07.08c.22.27.41.56.57.86l.03.07c.08.15.15.3.22.45l.02.07c.07.17.13.34.18.51.09.33.15.67.15 1.01l.01.13c.02.23.02.47.01.72v.08l-.01.12c-.01.17-.04.33-.06.49-.03.33-.1.66-.19 1-.02.1-.05.2-.08.3l-.02.07c-.08.3-.18.59-.29.88l-.05.13c-.13.27-.26.53-.41.79l-.08.13c-.18.25-.38.49-.6.72l-.07.1c-.03.03-.07.05-.1.07-.28.23-.59.43-.9.6A9.93 9.93 0 0110 20z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApexChart;
