import React, { useState } from 'react'
import CardStack from './CardStack'; // Import the CardStack component
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import RecurringIncome from './RecurringIncome'; // Make sure the path is correct
import { Reorder } from 'framer-motion';
import { useForm } from '@inertiajs/react';

// the drop down icons where the download icon is direct imported so it cant have function
import { Search } from 'lucide-react';

import ExpenseHistory from './IncomeHistory';

function IncomePage({ auth, income, monthlyIncomeSum, yearlyIncome, finance }) {

  console.log(yearlyIncome)
  const [showModal, setShowModal] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    income: '',
    schedule: '',
  });

  const totalIncome = income.reduce((acc, income) => {
    return acc + income.income;
  }, 0);
  localStorage.setItem('totalIncome', totalIncome.toLocaleString())

  const handleFormChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(data)
    post(route('income.store'), data);

    setShowModal(false);
  }
  console.log(income)


  const [setCategoryFilter, categoryFilter] = useState("")


  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      label: 'Monthly Expenses',
      data: [500, 600, 800, 810, 560, 550],
      backgroundColor: ['#1e40af', '#fb923c', '#4338ca', '#ff6b6b'],
      borderRadius: 10,
    }],
  });

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
            <div className="w-full space-y-4 lg:col-span-6 ">
              {/* Section 1 */}

              <div className="p-4 text-white bg-white-500 rounded shadow h-60">

                <CardStack monthlyIncomeSum={monthlyIncomeSum} yearlyIncome={yearlyIncome} finance={finance} /> {/* Use the CardStack component here */}
              </div>

              {/* Section 2 as a button */}
              <button
                className="flex justify-center items-center h-24 p-4 text-white bg-blue-800 rounded shadow w-full"
                onClick={() => setShowModal(true)}
              >
                <h1 className="text-xl font-semibold">+ Add Income</h1>
              </button>




              {/* Section 3 bar */}
              <div className=" p-4 text-white bg-white-500 rounded shadow">
                <div>
                  <Bar data={chartData} options={{ responsive: true }} />
                </div>

              </div>

              {/* Section 4 pie */}
              <div className="mt-5 flex items-center justify-center p-4 text-white bg-white-500 rounded shadow h-80">

                <div className="w-full h-full flex items-center justify-center">
                  <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
            {/* Column for Sections 5 & 6 */}

            <div className="flex flex-col space-y-4 lg:col-span-3">
              {/* Section 5 */}


              {/* Section 6 */}
              <div className="flex-grow p-4 text-black bg-white-500 rounded shadow">
                <ExpenseHistory />
              </div>

            </div>



          </div>
        </div>



      </div>


      {
        showModal ? (
          <>
            <form className="w-full max-w-lg" onSubmit={submitForm}>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        New Goal
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>

                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">


                      <div className="flex flex-wrap -mx-3 mb-2">
                        <div className='w-full md:w-[50%] px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-city'
                          >
                            Title
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            id='grid-city'
                            type='text'
                            placeholder='Part-Time'
                            name='title'  // Add name attribute for correct form data binding
                            value={data.title}
                            onChange={handleFormChange}
                            required
                          />
                        </div>

                        <div className='w-full md:w-[50%] px-3 mb-6 md:mb-0'>
                          <label
                            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                            htmlFor='grid-zip'
                          >
                            Income
                          </label>
                          <input
                            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            id='grid-zip'
                            type='number'
                            required
                            placeholder='12400'
                            name='income'  // Add name attribute for correct form data binding
                            value={data.income}
                            onChange={handleFormChange}
                          />
                        </div>

                        <div className='relative mt-5 ml-3'>
                          <select
                            name='schedule'
                            value={data.schedule}
                            onChange={handleFormChange}
                            className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                          >
                            <option value=''>Select</option>
                            <option value='Just Now'>Just Now</option>
                            <option value='daily'>Daily</option>
                            <option value='monthly'>Monthly</option>
                          </select>
                        </div>
                      </div>

                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        Save Changes
                      </button>



                    </div>

                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </form>
          </>
        ) : null
      }

    </AuthenticatedLayout >

  )
}

export default IncomePage
