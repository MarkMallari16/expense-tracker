import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import PrimaryButton from "@/Components/PrimaryButton";
import BalanceCard from "@/Components/BalanceCard";
import Category from "@/Components/Category/Category";
import { useState, useEffect } from "react";
import Graphs from "@/Components/Category/Graphs";
import Card from "@/Components/Card";
import { ToastContainer, toast } from 'react-toastify';
import Joyride, { STATUS } from "react-joyride";
import incomechart from "../../../public/images/incomechart.png"
import expensechart from "../../../public/images/expensechart.png"
import Transaction from "@/Components/Transaction/Transaction";
import {
    Wallet,
    MoreVertical,
    Receipt,
    PiggyBank,
    Banknote,
    EyeIcon,
    ChevronRight,
} from "lucide-react";
import { Dropdown } from "flowbite-react";
import Budget from "@/Components/BudgetFolder/Budget";
import DownloadBtn from "@/Components/Transaction/DownloadBtn";
export default function Dashboard({ auth, expenses, goals, finance }) {
    console.log("kani", finance[0]);



    const [{ run, steps }, setState] = useState({
        run: true,
        steps: [
            {
                content: <h2>Let's begin our journey</h2>,
                locale: { skip: <strong>SKIP</strong> },
                placement: 'center',
                target: 'body'
            },
            {
                content: <h2>Here you can see your available wallet balance</h2>,
                title: "Wallet",
                placement: 'bottom',
                target: '#step-1'
            },
            {
                content: <h2>You can see here your monthly income if you click on the go arrow you will be redirected to Income Page</h2>,
                title: "Income",
                placement: 'bottom',
                target: '#step-2'
            },
            {
                content: <h2>You can see here your monthly expenses if you click on the go arrow you will be redirected to Expense</h2>,
                title: "Expense",
                placement: 'bottom',
                target: '#step-3'
            }
        ]
    })

    console.log(steps)

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedStepIndex = localStorage.getItem('currentStepIndex');
        console.log('Stored Step Index:', storedStepIndex); // Debug statement
        if (storedStepIndex) {
            const parsedStepIndex = parseInt(storedStepIndex);
            console.log('Parsed Step Index:', parsedStepIndex); // Debug statement
            setState(prevState => ({
                ...prevState,
                steps: prevState.steps.slice(0, parsedStepIndex + 1)
            }));
        }
    }, []);


    const { data, setData, post, processing, reset } = useForm({
        title: "",
        category: "",
        price: "",
    });
    const wallet = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(finance[0]?.wallet);
    const incomeData = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(finance[0]?.totalIncome);
    const expenseData = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(finance[0]?.expense);



    const submit = (e) => {
        e.preventDefault();

        const balance = parseFloat(finance[0]?.wallet);
        const expensePrice = parseFloat(data.price);

        console.log("Balance:", balance);
        console.log("Expense Price:", expensePrice);

        if (isNaN(balance) || isNaN(expensePrice)) {
            console.error("Error: Balance or Expense Price is not a number");
            return;
        }

        if (balance < expensePrice) {
            console.log("Not Enough Balance");
            toast.error('Not Enough Balance', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            console.log("Submitting data:", data);
            post(route("expenses.store"), {
                onSuccess: () => {
                    reset();
                    setShowModal(false);
                },
            });
        }
    };


    const finishStepIndex = localStorage.getItem('currentStepIndex')
    console.log(steps.length)

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            {
                finishStepIndex < steps.length - 1 && <Joyride
                    continuous
                    callback={(data) => {
                        const { action, index, status } = data;
                        if (status === STATUS.FINISHED) {
                            localStorage.setItem('currentStepIndex', index.toString());
                        }
                    }}
                    run={run}
                    steps={steps}
                    hideCloseButton
                    scrollToFirstStep
                    showSkipButton
                    showProgress
                    styles={{
                        options: {
                            primaryColor: '#1E429F', // Change to your desired button color
                        }
                    }}
                />

            }

            <div className="flex flex-col sm:flex-row w-full  p-2">
                <div className="sm:w-[80%] max-w-full  rounded-sm ">
                    <div className="flex flex-col md:flex-row sm:flex-row sm:px-10  md:px-10 py-7 gap-5">
                        <div className="bg-blue-700 sm:w-[24%]  md:w-[50%] mt-3 relative rounded-md p-4 hover:bg-blue-900 transition ease-in-out shadow-2xl" id="step-1">
                            <div className="flex justify-between">
                                <Wallet color="white" size={60}></Wallet>

                            </div>

                            <p className="text-white px-2 text-xl mt-3 font-bold">
                                Wallet
                            </p>
                            <h5 className="text-white font-bold text-2xl px-2">
                                {wallet !== undefined ? wallet : 0}
                            </h5>
                            {show && (
                                <div className="w-20 h-12 bg-white absolute top-10 left-32">
                                    <h3>Manage</h3>
                                    <h3>Edit</h3>
                                </div>
                            )}
                        </div>
                        <div className="bg-slate-100 sm:w-[24%]  md:w-[50%] mt-3 rounded-md p-4 hover:bg-[#ebd5bf] transition ease-in-out" id="step-2">

                            <div className="flex justify-between">

                                <Banknote color="#020826" size={60}></Banknote>
                                <img src={incomechart} alt="chart" className="w-[150px]" />
                                <a href="/income">
                                    <ChevronRight
                                        color="#020826"
                                        size={20}
                                        className="cursor-pointer transition "
                                    />
                                </a>
                                
                            </div>

                            <p className="text-black px-2 text-xl mt-3 font-bold">
                                Income
                            </p>
                            <h5 className="text-green-600 font-bold text-2xl px-2">
                                {incomeData ? incomeData : 0}
                            </h5>

                        </div>
                        <div className="bg-slate-200 sm:w-[24%]  md:w-[50%] mt-3 rounded-md p-4 hover:bg-[#ebd5bf] transition ease-in-out " id="step-3">
                            <div className="flex justify-between">
                                <Receipt color="#020826" size={60}></Receipt>
                                <img src={expensechart} alt="chart" className="w-[150px]" />
                                <ChevronRight
                                    color="#020826"
                                    size={20}
                                    className="cursor-pointer transition "
                                    onClick={() => alert("click")}
                                />

                            </div>

                            <p className="text-black px-2 text-xl mt-3 font-bold">
                                Expenses
                            </p>
                            <h5 className="text-red-600 font-bold text-2xl px-2">
                                {expenseData !== undefined ? expenseData : 0}
                            </h5>
                        </div>
                        <div className="bg-slate-200 sm:w-[24%]  md:w-[50%] mt-3 rounded-md p-4 hover:bg-[#ebd5bf] transition ease-in-out ">
                            <p className="text-[#020826] px-2 text-md mt-3 font-bold">
                                Hello, {auth.user.name}
                            </p>
                            <h5 className="text-[#020826] font-bold text-3xl px-2">
                                Welcome Back
                            </h5>
                        </div>
                    </div>
                    <Graphs expenses={expenses} />


                    <div className=" bg-white sm:mx-10 ">
                        <p className="p-5 font-medium text-xl">Transactions</p>
                        <div className="flex justify-end items-center pr-2 gap-3">

                            <DownloadBtn expense={expenses} />

                            <span
                                onClick={() => setShowModal(true)}
                                className="p-2 w-30 h-10 text-white bg-blue-800 cursor-pointer rounded-md"
                            >
                                + Add Expense
                            </span>

                        </div>
                        <Transaction expenses={expenses} />
                    </div>
                </div>
                <div className="flex flex-col items-center w-[90%] sm:w-[20%]">
                    <Card />

                    <Category goals={goals} />
                    <Budget />
                </div>
            </div>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <form
                            onSubmit={submit}
                            className="w-full max-w-lg"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
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
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <div className="flex flex-wrap -mx-3 mb-2">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    for="grid-city"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    value={data.title}
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-city"
                                                    type="text"
                                                    placeholder="House"
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    for="grid-state"
                                                >
                                                    Category
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={data.category}
                                                        onChange={(e) =>
                                                            setData(
                                                                "category",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-state"
                                                    >
                                                        <option>Select</option>
                                                        <option>Food</option>
                                                        <option>Bills</option>
                                                        <option>
                                                            Transport
                                                        </option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg
                                                            className="fill-current h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    for="grid-zip"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    value={data.price}
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-zip"
                                                    type="text"
                                                    placeholder="90210"
                                                    onChange={(e) =>
                                                        setData(
                                                            "price",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>

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
                                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"

                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    <ToastContainer />
                </>
            ) : null}
        </AuthenticatedLayout>
    );
}
