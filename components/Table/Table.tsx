"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Th from "./Th";
import PaginationDemo from "../Pagination";
import { Button } from "../ui/button";
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
  const [fiterNAME, setFilterNAME] = useState("");
  const [initalData, setInitalData] = useState<fetchDataProps>(data);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(
    data ? Math.ceil(data.length / 10) : 0
  );
  const [showData, setShowData] = useState<
    | {
        id: number;
        name: string;
        email: string;
        age: number;
        status: boolean;
        country: string;
      }[]
    | []
  >([]);
  const [sortConfig, setSortCohfig] = useState<
    [{ col: string; dir: "ASC" | "DESC" }] | []
  >([]);

  useEffect(() => {
    console.log("useEffect1");
    if (sortConfig.length === 0) {
      setShowData(data.slice((page - 1) * 10, page * 10));
    } else {
      setShowData(initalData.slice((page - 1) * 10, page * 10));
    }
    return;
  }, [page, data, sortConfig, initalData]);

  useEffect(() => {
    if (fiterNAME.length > 0) {
      console.log("useEffect2");
      const timeoutId = setTimeout(() => {
        const NewData = initalData.filter((item) =>
          item.name.toLowerCase().includes(fiterNAME.toLowerCase())
        );
        setShowData(NewData.slice((page - 1) * 10, page * 10));
        setNumberOfPages(Math.ceil(NewData.length / 10));
        setPage(1);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
    setNumberOfPages(Math.ceil(initalData.length / 10));
  }, [fiterNAME, initalData, page]);

  useEffect(() => {
    console.log("useEffect3");
    if (sortConfig.length > 0) {
      setInitalData((prev) => {
        const NewData = [...prev];
        NewData.sort((a, b) => {
          for (const sort of sortConfig) {
            /* @ts-expect-error: We are sure that `find` returns a value when the index is found. */
            if (a[sort.col] > b[sort.col]) {
              return sort.dir === "ASC" ? 1 : -1;
            }
            /* @ts-expect-error: We are sure that `find` returns a value when the index is found. */
            if (a[sort.col] < b[sort.col]) {
              return sort.dir === "ASC" ? -1 : 1;
            }
          }
          return 0;
        });
        return NewData;
      });
    }
  }, [sortConfig]);
  const handleSort = (column: string) => {
    /* @ts-expect-error: We are sure that `find` returns a value when the index is found. */
    setSortCohfig((prev) => {
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
  };

  return (
    <div className="w-full sm:w-[70%] mx-auto flex flex-col space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row space-y-2.5 items-center justify-between">
        <Input
          className="w-[90%] sm:w-[50%] mx-auto"
          type="text"
          placeholder="Serach by name"
          onChange={(e) => setFilterNAME(e.target.value)}
          value={fiterNAME}
        />
        {(sortConfig.length > 0 || fiterNAME.length > 0) && (
          <Button
            variant="destructive"
            className="hover:cursor-pointer"
            onClick={() => {
              setSortCohfig([]);
              setFilterNAME("");
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
            {showData.map((item) => (
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
      <PaginationDemo
        page={page}
        setPage={setPage}
        numberOfPages={numberOfPages}
      />
    </div>
  );
};

export default Table;
