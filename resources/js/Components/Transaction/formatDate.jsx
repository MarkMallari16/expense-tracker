import { format } from 'date-fns';

export function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd MMMM yyyy ");
  const formattedTime = format(date, "h:mm:ss a");

  return (
    <div className="flex items-center">
      <span>{formattedDate}</span> {/* Display formatted date */}
      <span className="text-blue-800 ml-3">{formattedTime}</span> {/* Change color of time */}
    </div>
  );
}

export default formatDate;
