import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { EvTypeChart } from "./EvTypeChart";
import dataset from "../data/Electric_Vehicle_Population_Data.json";
import { useState } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//find the number of each make
const makeCountMap = {};
dataset.forEach((item) => {
  const make = item.Make;
  if (make) {
    makeCountMap[make] = (makeCountMap[make] || 0) + 1;
  }
});

const sortedCompanyCount = Object.entries(makeCountMap);

export const ManufacturesChart = () => {
  const [filter, setFilter] = useState(5);
  const [text, setText] = useState(true);

 const handelFilter = (e) => {
   const selectedValue = Number(e.target.value);
   setFilter(selectedValue);

   if (selectedValue !== sortedCompanyCount.length) {
     setText(true); 
   } else {
     setText(false); 
   }
 };



  

  const sortedCompany = Object.entries(makeCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, filter); //get top 5

  const labels = sortedCompany.map(([make]) => make);
  const count = sortedCompany.map(([_, count]) => count);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of EVs",

        data: count,
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔑 this lets it stretch to the div
    plugins: {
      legend: {
        position: "top",
      },
    },
    layout: {
      padding: 0, // Optional: remove inner padding if you want tighter fit
    },
  };

  return (
    <div className="w-full h-auto sm:h-110 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 p-2 sm:p-0">
    
      <div className="bg-white w-full sm:w-[50vw] h-[500px] sm:h-full rounded-lg shadow-md p-3 sm:p-5 flex justify-center flex-col mb-4 sm:mb-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
          {text ? (
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold truncate">
              Top {filter} Manufacturers
            </h1>
          ) : (
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold truncate">
              All Manufacturers
            </h1>
          )}
          <select
            className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium 
            bg-blue-100 text-blue-600 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg 
            transition-all duration-300 cursor-pointer outline-none border-2 
            border-blue-200 hover:border-blue-300"
            name="filter"
            id="filter"
            onChange={(e) => {
              handelFilter(e);
            }}
          >
            <option value="5">Top 5 Manufacturers</option>
            <option value="10">Top 10 Manufacturers</option>
            <option value="20">Top 20 Manufacturers</option>
            <option value={sortedCompanyCount.length}>All Manufacturers</option>
          </select>
        </div>
        <div className="w-full flex-1 min-h-0">
          <Bar options={options} data={data} />
        </div>
      </div>
      <div className="bg-white w-full sm:w-1/3 h-[400px] sm:h-full rounded-lg shadow-md flex justify-around items-center flex-col">
        <EvTypeChart></EvTypeChart>
      </div>
    </div>
  );
};
