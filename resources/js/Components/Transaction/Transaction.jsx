import React, { useState } from 'react';
import { formatDate } from './formatDate';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash, PencilIcon } from "lucide-react";
import DownloadBtn from "./DownloadBtn";
import DebouncedInput from "./DebouncedInput";
import { SearchIcon } from "../Icons/Icons";

function DeleteConfirmationModal({ isOpen, onDelete, onCancel }) {
  return (
    <div className={`fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-70 flex justify-center items-center ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="bg-white p-4 rounded-lg">
        <p className="text-lg font-semibold mb-2">Confirm Deletion</p>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded mr-2">Delete</button>
          <button onClick={onCancel} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function EditItemModal({ isOpen, onCancel, onSave, currentItem }) {
  const [title, setTitle] = useState(currentItem.title);
  const [category, setCategory] = useState(currentItem.category);
  const [price, setPrice] = useState(currentItem.price);

  const handleSave = () => {
    // Call the onSave function with updated values
    onSave({
      ...currentItem,
      title,
      category,
      price
    });
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-70 flex justify-center items-center ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="bg-white p-4 rounded-lg w-80">
        <p className="text-lg font-semibold mb-5">Edit Item</p>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Transport">Transport</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm" />
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Save</button>
          <button onClick={onCancel} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function Transaction({ expenses, updateExpenses }) {
  const expense = expenses.slice().reverse();

  const columnHelper = createColumnHelper();

  const [data, setData] = useState([...expense]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // To store the id of the item to be deleted
  const [selectedItem, setSelectedItem] = useState(null); // To store the selected item for editing

  const handleDeleteConfirmation = (id) => {
    setSelectedItemId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Remove the item from the data
    const updatedData = data.filter(item => item.id !== selectedItemId);
    setData(updatedData);
    // Update the original data source if updateExpenses is defined
    if (typeof updateExpenses === 'function') {
      updateExpenses(updatedData);
    }
    // Close the modal after deletion
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    // Close the modal without deletion
    setSelectedItemId(null);
    setDeleteModalOpen(false);
  };

  const handleEditItem = (id) => {
    const item = data.find(item => item.id === id);
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedItem) => {
    // Find the index of the item to be updated
    const index = data.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      // Update the item in the data array
      const newData = [...data];
      newData[index] = updatedItem;
      setData(newData);
      // Close the modal
      setEditModalOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
  };

  const columns = [
    columnHelper.accessor("id", {
      id: "S.No",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "S.No",
    }),

    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Title",
    }),

    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),

    columnHelper.accessor("price", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Price",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => <span>{formatDate(info.getValue())}</span>, // Use formatDate to format date
      header: "Date",
    }),
    columnHelper.accessor("progress", {
      cell: (info) => (
        <span className="flex gap-2">
          <Trash size={20} color="red" className='cursor-pointer' onClick={() => handleDeleteConfirmation(info.row.original.id)} />
          <PencilIcon size={20} color="black" className='cursor-pointer' onClick={() => handleEditItem(info.row.original.id)} />
        </span>
      ),
      header: "Action",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-5 w-100 text-black fill-gray-400">
      <DeleteConfirmationModal isOpen={deleteModalOpen} onDelete={handleConfirmDelete} onCancel={handleCancelDelete} />

      {/* Conditionally render the EditItemModal */}
      {selectedItem && (
        <EditItemModal
          isOpen={editModalOpen}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
          currentItem={selectedItem}
        />
      )}

      <div className="flex justify-between mb-2 ">

        <div className="mt-4 relative w-full flex items-center">
          <div className='ms-4 absolute'>
            <SearchIcon /> {/* Adjusted margin */}
          </div>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="rounded-md pl-8 py-2 bg-transparent outline-none w-full focus:w-1/3 duration-300" // Adjusted padding
            placeholder="Search all columns..."
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className=" w-full text-left">
          <thead className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={` ${i % 2 === 0 ? "bg-white   " : "bg-gray-200"} `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Record Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mt-5 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="rounded-md ps-2 p-1 bg-transparent text-black"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Transaction;
