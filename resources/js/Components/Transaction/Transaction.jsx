import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { USERS } from "../data";
  import { useState } from "react";
  import DownloadBtn from "./DownloadBtn";
  import DebouncedInput from "./DebouncedInput";
  import { SearchIcon } from "../Icons/Icons";
import { Trash, PencilIcon } from "lucide-react";


function Transaction( expenses ) {

  const expense = expenses.expenses.slice().reverse();

    const columnHelper = createColumnHelper();

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
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Date",
      }),
      columnHelper.accessor("progress", {
        cell: (info) => <span className="flex gap-2"><Trash size={20} color="red"/> <PencilIcon size={20} color="black" /></span>,
        header: "Action",
      }),
    ];
    const [data] = useState(() => [...expense]);
    const [globalFilter, setGlobalFilter] = useState("");

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
        <div className="p-1 max-w-5xl mx-auto text-black fill-gray-400">
          <div className="flex justify-between mb-2 mx-5">
            <div className="w-full flex items-center gap-1">
              <DownloadBtn expense={expense} />
              <SearchIcon/>
              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                className="p-2 bg-transparent outline-none  w-full focus:w-1/3 duration-300 "
                placeholder="Search all columns..."
              />
            </div>

          </div>
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
                    className={`
                    ${i % 2 === 0 ? "bg-white   " : "bg-gray-200"}
                    `}
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
          {/* pagination */}
          <div className="flex items-center justify-end mt-2 gap-2">
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
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
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
              className="p-2 bg-transparent text-black"
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
    };

export default Transaction;
