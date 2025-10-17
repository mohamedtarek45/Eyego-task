"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./Document";
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
  if (!data || data.length === 0) {
    return (
      <button
        disabled
        className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
      >
        No Data to Export
      </button>
    );
  }
  return (
    <PDFDownloadLink
      key={JSON.stringify(data)}
      document={<MyDocument data={data} />}
      fileName="UserDataReport.pdf"
      className="px-6 py-3 bg-red-400 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Download Pdf
    </PDFDownloadLink>
  );
}
