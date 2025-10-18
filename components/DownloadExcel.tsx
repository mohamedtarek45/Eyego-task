import * as XLSX from "xlsx";
type fetchDataProps =
  | {
      id: number;
      name: string;
      email: string;
      age: number;
      status: boolean;
      country: string;
    }[]
  | [];
const DownloadExcel = ({ data }: { data: fetchDataProps }) => {
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.writeFile(workbook, "Users.xlsx", { compression: true });
  };

  return (
    <div>
      <button
      disabled={!data || data.length === 0}
        onClick={handleDownload}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-green-700 hover:cursor-pointer disabled:bg-gray-400 disabled:text-white "
      >
        Download Excel
      </button>
    </div>
  );
};

export default DownloadExcel;
