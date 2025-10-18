"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
export default function DownloadPDF({ data }: { data: fetchDataProps }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("User Data Report", 14, 20);

    const tableColumn = ["ID", "Name", "Email", "Age", "Status", "Country"];
    const tableRows = data.map((item) => [
      item.id,
      item.name,
      item.email,
      item.age,
      item.status ? "Active" : "Inactive",
      item.country,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("UserDataReport.pdf");
  };
  return (
    <button
      disabled={!data || data.length === 0}
      onClick={handleDownload}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-green-700 hover:cursor-pointer disabled:bg-gray-400 disabled:text-white "
    >
      Download PDF
    </button>
  );
}
