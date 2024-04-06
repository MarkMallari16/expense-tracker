import React, { useState } from 'react';
import { Badge, Calendar, Modal } from 'antd';
import moment from 'moment';

function ExpenseCalendar({ expenses }) {
  const [selectedDateExpenses, setSelectedDateExpenses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Group expenses by date and calculate total expense amount for each date
  const totalExpensesByDate = {};
  expenses.forEach((expense) => {
    const date = moment(expense.created_at).format('YYYY-MM-DD');
    if (!totalExpensesByDate[date]) {
      totalExpensesByDate[date] = [];
    }
    totalExpensesByDate[date].push(expense);
  });

  // Calculate total expense amount for each month
  const totalExpensesByMonth = {};
  expenses.forEach((expense) => {
    const month = moment(expense.created_at).format('YYYY-MM');
    if (!totalExpensesByMonth[month]) {
      totalExpensesByMonth[month] = 0;
    }
    totalExpensesByMonth[month] += parseFloat(expense.price);
  });

  const dateCellRender = (value) => {
    const date = value.format('YYYY-MM-DD');
    const totalExpense = totalExpensesByDate[date] || [];
    if (totalExpense.length > 0) {
      return (
        <ul className="events">
          <li>
            <Badge status="error" text={`Total Expense: ${totalExpense.length}`} onClick={() => handleDateClick(date)} />
          </li>
        </ul>
      );
    }
    return null;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedDateExpenses(totalExpensesByDate[date]);
    setVisible(true);
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  const monthCellRender = (value) => {
    const month = value.format('YYYY-MM');
    const totalExpense = totalExpensesByMonth[month] || 0;
    if (totalExpense > 0) {
      return (
        <div className="notes-month">
          <section className='text-lg text-red-600 font-semibold'>P{totalExpense.toFixed(2)}</section>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
      <Modal
        title={<h3 className='text-2xl'>Expenses for {selectedDate}</h3>}
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <ul className='mt-3'>
          {selectedDateExpenses.map((expense, index) => (
            <div className=' flex items-center gap-3 mb-2'>
              <div className='bg-gray-200 p-1 rounded-md'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>

              </div>

            <li className='text-sm' key={index}>{expense.title} - {expense.price}</li>
            </div>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default ExpenseCalendar;
