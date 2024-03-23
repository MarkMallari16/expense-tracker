import React, { useState } from 'react'
import CardStack from './CardStack'; // Import the CardStack component
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import RecurringIncome from './RecurringIncome'; // Make sure the path is correct
import { Reorder } from 'framer-motion';


// the drop down icons where the download icon is direct imported so it cant have function
import { Search } from 'lucide-react';

import ExpenseHistory from './ExpenseHistory';

function IncomePage({ auth }) {


    const [setCategoryFilter, categoryFilter] = useState("")


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
        <AuthenticatedLayout user={auth.user}>


            <div>

                <div className="p-4 ">
                    {/* Grid setup */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

                        {/* Column for Section 7 RecurringExpenses*/}
                        <div className="flex items-top justify-center p-4 text-black bg-white-500 rounded shadow lg:col-span-3">
                            <RecurringIncome />
                        </div>

                        {/* Column for Sections 1-4 */}
                        <div className="w-full space-y-4 lg:col-span-6">
                            {/* Section 1 */}

                            <div className="p-4 text-white bg-white-500 rounded shadow h-60">

                                <CardStack /> {/* Use the CardStack component here */}
                            </div>

                            {/* Section 2 as a button */}
                            <button
                                className="flex justify-center items-center h-24 p-4 text-white bg-blue-800 rounded shadow w-full"
                                onClick={() => {
                                    // Your click handler logic here
                                }}
                            >
                                <h1 className="text-xl font-semibold">+ Add Income</h1>
                            </button>




                            {/* Section 3 bar */}
                            <div className="p-4 text-white bg-white-500 rounded shadow h-80">
                                <Bar data={chartData} options={{ responsive: true }} />

                            </div>

                            {/* Section 4 pie */}
                            <div className="flex items-center justify-center p-4 text-white bg-white-500 rounded shadow h-80">

                                <div className="w-full h-full flex items-center justify-center">
                                    <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                        {/* Column for Sections 5 & 6 */}

                        <div className="flex flex-col space-y-4 lg:col-span-3">
                            {/* Section 5 */}
                            <div className="h-24 p-4 text-black bg-white-500 rounded shadow">

                                <p>Jamdsasdal</p>


                            </div>

                            {/* Section 6 */}
                            <div className="flex-grow p-4 text-black bg-white-500 rounded shadow">
                                <ExpenseHistory />
                            </div>

                        </div>



                    </div>
                </div>



            </div>




        </AuthenticatedLayout>

    )
}

export default IncomePage
