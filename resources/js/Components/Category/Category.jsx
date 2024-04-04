import React, { useState } from "react";
import { format } from "date-fns";
import { Inertia } from "@inertiajs/inertia";

function Category(props) {
    function formatReadableDate(dateString) {
// Parse the date string and format it
        return format(new Date(dateString), "MMMM d, yyyy" );
    }

// Example usage:
    const goalTargetDate = "2023-03-03";
    console.log("datahi", props.goals);
    const [fundsModal, setFundsModal] = useState({ show: false, goal: null });

    const goals = props.goals;
    const [form, setForm] = useState({
        name: "",
        target_amount: "",
        target_date: "",
        users_image: null,
    });
    const [showModal, setShowModal] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const formData = {
            ...form,
            name: form.name || "Default Name",
        };

        try {
            // Use Inertia.post method to send form data to the Laravel backend
            await Inertia.post(route("goals.store"), formData);

            // Reset form fields
            setForm({
                name: "",
                target_amount: "",
                target_date: "",
                users_image: null,
            });

            // Close the modal
            setShowModal(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleGoalClick = (goal) => {
        setFundsModal({ show: true, goal });
    };

    const addFundsToGoal = async (e, balance) => {
        e.preventDefault();
        try {
            const response = await Inertia.post(route('goals.addFunds'), {
                goalId: fundsModal.goal.id,
                balance: balance,
            });



            // Assuming the response includes the updated goal
            const updatedGoal = response.props.goals.find(g => g.id === fundsModal.goal.id);
            setFundsModal({ ...fundsModal, goal: updatedGoal });
            setFundsModal({ show: false, goal: null }); // Close the modal
        } catch (error) {
            console.error("Error adding funds:", error);
            setFundsModal({ show: false, goal: null }); // Close the modal

        }
    };

    const closeModal = (e) => {
        if (e.target.id === "backdrop") {
            setShowModal(false);
            setFundsModal({ show: false, goal: null });
        }
    };

    return (
        <div className="w-full mx-auto bg-white h-22  py-2 sm:rounded-md">
            <div className="border-b-2 px-2 border-[#fafafa] mb-3">
                <p className="text-xl">Category</p>
            </div>
            <div className="w-full px-2 pb-4 flex gap-2 overflow-x-auto">
               <div className="flex items-center">
               <div className="" onClick={() => setShowModal(true)}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer bg-orange-200">
                        <span className="text-4xl">+</span>
                    </div>

                </div>
                <div className="w-50 py-2 px-2">
                        <p className="text-lg font-bold">Add Category</p>
                </div>
               </div>
                {goals?.map((goal) => (
                    <div className="flex" key={goal.id}  onClick={() => handleGoalClick(goal)}>
                        <div className="w-fit h-fit rounded-full flex items-center justify-center cursor-pointer bg-blue-800">
                            <span className="text-4xl w-14 h-14 flex object-cover justify-center cursor-pointer items-center">
                                <img className="w-14 h-14 object-cover rounded-full" src={`storage/${goal.users_image}`} alt="profile" />
                            </span>
                        </div>
                        <div className="w-36 py-2 px-2">
                            <p className="text-md font-bold">{goal.name}</p>
                            <p className="text-xs font-bold">
                                ₱{goal.target_amount?.toLocaleString()}
                            </p>
                            <p className="text-xs font-bold">
                                {formatReadableDate(goal.target_date)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {showModal ? (
                <>
                    <form onSubmit={submitForm} className="w-full max-w-lg">
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                                            <div className="w-full md:w-[50%] px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    for="grid-city"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-city"
                                                    type="text"
                                                    placeholder="Albuquerque"
                                                    value={form.name}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>

                                            <div className="w-full md:w-[50%] px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    for="grid-zip"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-zip"
                                                    type="number"
                                                    value={form.target_amount}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            target_amount: e.target
                                                                .value,
                                                        })
                                                    }
                                                    required
                                                    placeholder="90210"
                                                />
                                            </div>
                                            <input
                                                className="mx-3 mt-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                type="date"
                                                value={form.target_date}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        target_date:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="file"
                                                required
                                                onChange={(e) =>
                                                    setForm((prevForm) => ({
                                                        ...prevForm,
                                                        users_image:
                                                            e.target.files[0],
                                                    }))
                                                }
                                            />
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
                                            // Add this line to call submitForm when the button is clicked
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
            ) : null}
            {fundsModal.show && (
                <div id="backdrop" className="fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50" onClick={closeModal}>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={e => e.stopPropagation()}>
                            {/* Modal content for adding/viewing funds */}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Funds to {fundsModal.goal.name}
                                    </h3>
                                    <button
                                        className="text-black bg-transparent border-0 text-2xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setFundsModal({ show: false, goal: null })}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={(e) => addFundsToGoal(e, e.target.balance.value)}>
                                        <input
                                            name="balance"
                                            type="number"
                                            placeholder="Amount"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            required
                                        />
                                        <p className="pl-2">{`Current balance ${fundsModal.goal.balance}`}</p>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setFundsModal({ show: false, goal: null })}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Add Funds
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Category;
