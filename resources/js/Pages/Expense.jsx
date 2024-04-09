import React, { useState } from 'react';
import CardStack from './CardStack';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Pie } from 'react-chartjs-2';
import RecurringExpenses from './RecurringExpenses';
import ExpenseCalender from './Profile/ExpenseCalender';
import { useForm } from "@inertiajs/react";
import ExpenseHistory from './ExpenseHistory';
import ExpenseCategory from '@/Components/Category/ExpenseCategory';

function Expense({ auth, expenses }) {
    const [showModal, setShowModal] = useState(false);
    const { data: formData, setData: setFormData, post, reset } = useForm({
        title: "",
        category: "",
        price: "",
        recurring: false,
        endDate: "",
        recurringType: "Monthly",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("expenses.store"), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

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
                <div className="p-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                        <div className="flex items-top justify-center p-4 text-black bg-white-500 rounded shadow lg:col-span-3">
                            <RecurringExpenses />
                        </div>
                        <div className="w-full space-y-4 lg:col-span-6">
                            <div className="p-4 text-white bg-white-500 rounded shadow h-60">
                                <CardStack />
                            </div>
                            <button
                                className="flex justify-center items-center h-24 p-4 text-white bg-blue-800 rounded shadow w-full"
                                onClick={() => setShowModal(true)}
                            >
                                <h1 className="text-xl font-semibold">+ Add Expense</h1>
                            </button>
                            <div className="flex items-center justify-center p-4 text-white bg-white-500 rounded shadow h-80">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                            <ExpenseCalender expenses={expenses} />
                        </div>
                        <div className="flex flex-col space-y-4 lg:col-span-3">
                            <div className="h-auto p-4 text-black bg-white-500 rounded shadow">
                                <ExpenseCategory />
                            </div>
                            <div className="flex-grow p-4 text-black bg-white-500 rounded shadow">
                                <ExpenseHistory expenses={expenses} />
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <form onSubmit={submit} className="w-full max-w-lg">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                Add Expenses
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
                                        <div className="relative p-6 flex-auto">
                                            <div className="flex flex-wrap -mx-3 mb-2">
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-city"
                                                    >
                                                        Title
                                                    </label>
                                                    <input
                                                        value={formData.title}
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-city"
                                                        type="text"
                                                        placeholder="ex. Jobeeee"
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                title: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-state"
                                                    >
                                                        Category
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            value={formData.category}
                                                            onChange={(e) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    category: e.target.value,
                                                                })
                                                            }
                                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            id="grid-state"
                                                        >
                                                            <option>Select</option>
                                                            <option>Food</option>
                                                            <option>Bills</option>
                                                            <option>Transport</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-zip"
                                                    >
                                                        Price
                                                    </label>
                                                    <input
                                                        value={formData.price}
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-zip"
                                                        type="text"
                                                        placeholder="90210"
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                price: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative p-6 flex-auto mt-5">
                                                <div className="flex flex-wrap -mx-3 mb-10">
                                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="recurring-checkbox"
                                                        >
                                                            Recurring?
                                                        </label>
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.recurring}
                                                            onChange={(e) =>
                                                                setFormData({
                                                                    ...formData,
                                                                    recurring: e.target.checked,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                    {formData.recurring && (
                                                        <>
                                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                                <label
                                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                                    htmlFor="end-date"
                                                                >
                                                                    End Date
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    value={formData.endDate}
                                                                    onChange={(e) =>
                                                                        setFormData({
                                                                            ...formData,
                                                                            endDate: e.target.value,
                                                                        })
                                                                    }
                                                                    className="p-2 block w-full border-gray-300 rounded-md shadow-sm"
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                                <label
                                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                                    htmlFor="recurring-type"
                                                                >
                                                                    Recurring Type
                                                                </label>
                                                                <select
                                                                    value={formData.recurringType}
                                                                    onChange={(e) =>
                                                                        setFormData({
                                                                            ...formData,
                                                                            recurringType: e.target.value,
                                                                        })
                                                                    }
                                                                    className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                    id="recurring-type"
                                                                >
                                                                    <option>Monthly</option>
                                                                    <option>Weekly</option>
                                                                    <option>Daily</option>
                                                                </select>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

export default Expense;
