import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

function ExpenseHistory() {
  const [history, setHistory] = useState([
    { id: '1', title: "Electricity", category: 'Utilities', date: '2023-03-01', value: '$100' },
    { id: '2', title: "Foods", category: 'Groceries', date: '2023-03-02', value: '$200' },
    { id: '3', title: "Water Bill", category: 'Utilities', date: '2023-03-03', value: '$150' },
    { id: '4', title: "Netflix", category: 'Entertainment', date: '2023-03-04', value: '$50' },
    // Add more history items as needed
  ]);

  const items = [
    { name: "Utilities" },
    { name: "Groceries" },
    { name: "Entertainment" },
  ];

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterSelection = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHistory = history.filter((item) => {
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch;
  }).filter((item) => {
    const categoryMatch = selectedFilters.length === 0 || selectedFilters.includes(item.category);
    return categoryMatch;
  });

  return (
    <div>
      <div className="flex mb-4 w-full text-center p-5 bg-blue-800 text-white rounded">
        <div className='w-[22%] pt-2'>
          <Download className="mr-2" size={24} />
        </div>
        <div className="flex-grow">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => {}}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black"
            >
              <Search size={20} />
            </button>
            <input
              type="text"
              placeholder="Search History..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-8 pr-3 py-2 w-full rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className='w-[20%] pt-2 pl-3'>
          <DropdownMenu iconType="filter">
            <div className="w-48 mx-auto my-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`w-full p-3 mb-4 bg-gray-100 text-black rounded shadow hover:bg-gray-200 text-center ${
                    selectedFilters.includes(item.name) ? 'bg-blue-500' : ''
                  }`}
                  onClick={() => handleFilterSelection(item.name)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col items-center justify-top p-4 text-black bg-white rounded shadow">
        <div className="w-full">
          {filteredHistory.map((item) => (
            <div key={item.id} className="mb-4 p-4 bg-gray-100 rounded shadow flex justify-between">
              <div className="flex flex-col">
              <p className="text-md font-bold text-gray-600 mb-auto">{item.title}</p>
                <p className="text-sm text-gray-600 mb-3">Date: <span className="font-semibold">{item.date}</span></p>
                <p className="text-sm text-gray-600 mb-auto">Category: <span className="font-semibold">{item.category}</span></p>
                <p className="text-sm text-gray-600 mb-auto">Value: <span className="font-semibold">{item.value}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpenseHistory;
