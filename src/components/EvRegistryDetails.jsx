import { useMemo, useState } from "react";
import dataset from "../data/Electric_Vehicle_Population_Data.json";

export const EvRegistryDetails = () => {
  const [search, setSearch] = useState("");
  const [lodeMore , setLodemore] = useState("10")

  const handelLoadMore=()=>{
    setLodemore(Number(lodeMore)+10)
  }
  const handelLoadAll=()=>{
    setLodemore(dataset.length)
  }




  const filterData = useMemo(() => {
    return dataset.filter((item) => {
      const sh = search.toLowerCase();
      return (
        item.City.toLowerCase().includes(sh) ||
        item.Make.toLowerCase().includes(sh) ||
        item.Model.toLowerCase().includes(sh)
      );
    });
  }, [search]);

  return (
    <div className="w-full flex gap-10 mt-12 px-4 sm:px-8">
      <div className="bg-white w-full rounded-lg shadow-md p-3 sm:p-5 min-h-full pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            EV Registry Details
          </h1>
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full sm:w-80 p-2.5 pl-10 text-base text-gray-700 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 font-normal"
              placeholder="Search for city, make, model..."
            />
          </div>
        </div>
        <div className="w-full">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-base text-left text-gray-700 border-collapse">
              <thead className="text-xs sm:text-sm text-gray-800 uppercase bg-gray-100">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold tracking-wider">
                    City
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold tracking-wider">
                    Make
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold tracking-wider">
                    Model
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 font-semibold tracking-wider">
                    Year
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 font-semibold tracking-wider">
                    Range
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 font-semibold tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterData.slice(0, lodeMore).map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b transition duration-200 hover:bg-gray-50"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap font-normal">
                      {item.City}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap font-normal">
                      {item.Make}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap font-normal">
                      {item.Model}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap font-normal">
                      {item.ModelYear}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap font-normal">
                      {item.ElectricRange}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap font-normal">
                      {item.ElectricVehicleType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-5">
            <button onClick={()=>handelLoadMore()} className=" shadow-md w-30 h-10 font-semibold cursor-pointer hover:bg-amber-200  bg-amber-300 rounded-lg mt-5">
              Lode more
            </button>
            <button onClick={()=>handelLoadAll()} className=" shadow-md w-20 h-10 font-semibold cursor-pointer hover:bg-red-200 bg-red-300 rounded-lg mt-5">
              All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
