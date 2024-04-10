import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

function FinancialSetupPage() {
  const [step, setStep] = useState(1);
  const [monthlySalary, setMonthlySalary] = useState('');
  const [recurringBills, setRecurringBills] = useState([{ name: '', amount: '', start: '', end: '' }]);
 const [desiredBudget, setDesiredBudget] = useState('');
  const [budgetType, setBudgetType] = useState('');
  const totalSteps = 5;

  const handleBillChange = (index, event) => {
    const newBills = [...recurringBills];
    newBills[index][event.target.name] = event.target.value;
    setRecurringBills(newBills);
  };

  const addBill = () => {
    setRecurringBills([...recurringBills, { name: '', amount: '', start: '', end: '' }]);
  };

  const removeBill = (index) => {
    const filteredBills = recurringBills.filter((_, i) => i !== index);
    setRecurringBills(filteredBills);
  };

  const handleSubmit = (event) => { 
    event.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      Inertia.post('/financial/setup', {
        monthlySalary,

        desiredBudget,
        budgetType,
      });

      setStep(step + 1)
      setInterval(() => 10000)
      setInterval(() => 10000)
      setInterval(() => 500)

      window.location.reload()
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className="flex items-center justify-between mb-8">
            <div className="text-gray-600">Question {step}/3</div>
            <div className="w-10 h-1 bg-blue-500 rounded" style={{ width: `${(step / 7) * 100}%` }}></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
                <div>
                    <label htmlFor="monthlySalary" className="block mb-2 text-lg font-semibold text-gray-700">
                       Enter your Monthly Salary
                    </label>
                    <input
                        id="monthlySalary"
                        type="number"
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        placeholder="30,000"
                    />
                </div>
            )}

          

            {step === 2 && (
                <div>
                <label htmlFor="desiredBudget" className="block text-sm font-medium text-gray-700">Desired Budget</label>
                <input
                  type="number"
                  value={desiredBudget}
                  onChange={(e) => setDesiredBudget(e.target.value)}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                  id="desiredBudget"
                  placeholder="30,000"
                />

<label htmlFor="budgetType" className="block text-sm font-medium text-gray-700">Budget Type</label>
                 <select
                   value={budgetType}
                   onChange={(e) => setBudgetType(e.target.value)}
                   className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                   id="budgetType"
                 >
                   <option value="">Select...</option>
                   <option value="daily">Daily</option>
                   <option value="weekly">Weekly</option>
                   <option value="monthly">Monthly</option>
                 </select>
              </div>
            )}
         
            {
                step === 3 && (
                    <p className='p-3 bg-green-300 rounded-sm'>Thank you for submmiting your information! 🥳</p>
                )
            }

            {/* Repeat similar JSX for other steps/questions */}
            {
                step < 3 &&  (
                    <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Continue →
                    </button>
                </div>
                )
            }

        </form>
    </div>
</div>
  );
}

export default FinancialSetupPage;
