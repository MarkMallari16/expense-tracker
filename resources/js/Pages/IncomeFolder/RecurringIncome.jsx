import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';

function RecurringIncome() {
  const defaultExpense = [
    { id: 'utility', name: 'Utility', amount: 100 },
    { id: 'foods', name: 'Foods', amount: 200 },
    { id: 'house_rent', name: 'House Rent', amount: 800 },
    { id: 'car', name: 'Car', amount: 300 },
    { id: 'family', name: 'family', amount: 1000 },
    { id: 'occasions', name: 'occasions', amount: 500 },
    { id: 'bitches', name: '', amount: 10000 }, // Consider renaming for appropriateness.
    { id: 'charity', name: 'charity', amount: 300 },
    // Add more expenses as needed
  ];
  const [expenses, setExpenses] = useState(defaultExpense);
  const [initialExpenses, setInitialExpenses] = useState([]);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('income'));
    if (savedExpenses) {
      setExpenses(savedExpenses);
      setInitialExpenses(savedExpenses);
    } else {
      setInitialExpenses(expenses);
    }
  }, []);

  useEffect(() => {
    const isChanged = JSON.stringify(expenses) !== JSON.stringify(initialExpenses);
    setIsOrderChanged(isChanged);
  }, [expenses, initialExpenses]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isOrderChanged && !isSaveClicked) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes!';
      }
    };

    if (isOrderChanged && !isSaveClicked) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isOrderChanged, isSaveClicked]);

  const handleSave = () => {
    localStorage.setItem('income', JSON.stringify(expenses));
    setInitialExpenses(expenses);
    setIsOrderChanged(false);
    setIsSaveClicked(true);
    setTimeout(() => setIsSaveClicked(false), 0); // Reset isSaveClicked to allow future changes detection.
  };

  const handleDefault = () => {
    setExpenses(defaultExpense);
    setIsOrderChanged(false);
    setIsSaveClicked(false);
  };

  return (
    <div className="flex flex-col items-center justify-top p-4 text-black bg-white rounded shadow lg:col-span-3">
      <div className="mb-4 w-full text-center p-2 bg-blue-800 text-white rounded cursor-pointer" onDoubleClick={handleDefault}>
        <h2 className="font-semibold text-lg">Recurring Income</h2>
      </div>
      {isOrderChanged && !isSaveClicked && (
        <div className="flex justify-center mb-2 mt-[-7px] space-x-4">
          <button
            className="w-20 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 flex items-center justify-center"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
      <Reorder.Group axis="y" values={expenses} onReorder={(newExpenses) => {
        setExpenses(newExpenses);
        setIsSaveClicked(false); // Allow save button to show after reordering.
      }} className="w-full">
        {expenses.map((expense) => (
          <Reorder.Item key={expense.id} value={expense} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <p className="text-sm text-gray-600">Income Name: <span className="font-semibold">{expense.name}</span></p>
            <p className="text-sm text-gray-600">Amount: <span className="font-semibold">${expense.amount}</span></p>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default RecurringIncome;
