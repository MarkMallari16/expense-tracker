import { DownloadIcon } from "../Icons/Icons";
import * as XLSX from "xlsx/xlsx.mjs";
import { format, parseISO } from 'date-fns';

const DownloadBtn = ({ expense = [], fileName = "data" }) => {
  const handleDownload = () => {
    const filteredData = expense.map(({ title, category, price, created_at }) => ({
      title,
      category,
      price,
      // Format the date to a more readable form using date-fns
      created_at: format(parseISO(created_at), 'MMMM dd, yyyy')
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div >
      <div className="flex items-center gap-1">
        <DownloadIcon />
        <button
          className="download-btn"
          onClick={handleDownload}
          aria-label="Download Excel"

        >

          Download
        </button>

      </div>
    </div>
  );
};

export default DownloadBtn;
