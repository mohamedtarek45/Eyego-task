"use client";

import { Input } from "@/components/ui/input";
import { useMemo, useState, useEffect } from "react";
import Th from "./Th";
import PaginationDemo from "../Pagination";
import { Button } from "../ui/button";
import DownloadPDF from "../DownlosdPdf";
import DownloadExcel from "../DownloadExcel";
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
const Table = ({ data }: { data: fetchDataProps }) => {
  const [search, setSearch] = useState("");
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<
    { col: string; dir: "ASC" | "DESC" }[]
  >([]);
  useEffect(() => {
    const t = setTimeout(() => {
      setFilterName(search);
    }, 700);
    return () => clearTimeout(t);
  }, [search]);
  const sortedData = useMemo(() => {
    if (sortConfig.length === 0) return data;
    const newData = [...data];
    newData.sort((a, b) => {
      for (const sort of sortConfig) {
        const aVal = a[sort.col as keyof typeof a];
        const bVal = b[sort.col as keyof typeof b];
        if (aVal > bVal) return sort.dir === "ASC" ? 1 : -1;
        if (aVal < bVal) return sort.dir === "ASC" ? -1 : 1;
      }
      return 0;
    });
    return newData;
  }, [data, sortConfig]);
  const filteredData = useMemo(() => {
    if (!filterName) return sortedData;
    return sortedData.filter((item) =>
      item.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }, [sortedData, filterName]);

  const { paginatedData, totalPages } = useMemo(() => {
    let total = 1;
    if (filteredData.length > 10) {
      total = Math.ceil(filteredData.length / 10);
    }
    const start = (page - 1) * 10;
    const end = start + 10;

    const paginatedData = filteredData.slice(start, end);
    return {
      paginatedData: paginatedData,
      totalPages: total,
    };
  }, [filteredData, page]);

  const handleSort = (column: string) => {
    setSortConfig((prev) => {
      const index = prev.findIndex((item) => item.col === column);
      if (index === -1) {
        return [...prev, { col: column, dir: "ASC" }];
      }
      const copy = [...prev];
      const direction = copy[index].dir === "ASC" ? "DESC" : "ASC";
      copy[index] = {
        ...copy[index],
        dir: direction,
      };
      return [...copy];
    });
    setPage(1);
  };

  return (
    <div className="w-full sm:w-[70%] mx-auto flex flex-col space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row space-y-2.5 items-center justify-between">
        <Input
          className="w-[90%] sm:w-[50%] mx-auto"
          type="text"
          placeholder="Serach by name"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        {(sortConfig.length > 0 || filterName.length > 0) && (
          <Button
            variant="destructive"
            className="hover:cursor-pointer"
            onClick={() => {
              setSortConfig([]);
              setFilterName("");
            }}
          >
            Clear Sort&Filter
          </Button>
        )}
      </div>
      <div className="w-full overflow-x-auto sm:overflow-x-hidden px-3 sm:px-0">
        <table className="w-full  text-center">
          <thead className="bg-gray-100 border-b text-center">
            <tr>
              <Th
                handleSort={handleSort}
                sortConfig={sortConfig}
                visibleName="Name"
                name="name"
              />
              <Th
                handleSort={handleSort}
                sortConfig={sortConfig}
                visibleName="Email"
                name="email"
              />
              <Th
                handleSort={handleSort}
                sortConfig={sortConfig}
                visibleName="Age"
                name="age"
              />
              <Th
                handleSort={handleSort}
                sortConfig={sortConfig}
                visibleName="Status"
                name="status"
              />
              <Th
                handleSort={handleSort}
                sortConfig={sortConfig}
                visibleName="Country"
                name="country"
              />
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-700">{item.name}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {item.email}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">{item.age}</td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  <span
                    className={item.status ? "text-green-500" : "text-red-500"}
                  >
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {item.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-7 my-5">
        <DownloadPDF data={filteredData} />
        <DownloadExcel data={filteredData} />
      </div>
      <PaginationDemo
        page={page}
        setPage={setPage}
        numberOfPages={totalPages}
      />
    </div>
  );
};

export default Table;
