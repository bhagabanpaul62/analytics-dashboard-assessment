import { FaCar } from "react-icons/fa";
import { FaIndustry } from "react-icons/fa";
import { FaBatteryFull } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import dataset from "../data/Electric_Vehicle_Population_Data.json"

//extract number of clar 
const EvCounts = dataset.length;

//top seling brand
const makeCountMap = {}
dataset.forEach((item)=>{ 
  const make = item.Make ;
  if(make){
    makeCountMap[make] = (makeCountMap[make] || 0) + 1;
  }
})
const sortedCompany = Object.entries(makeCountMap).sort((a,b)=>b[1]-a[1]).slice(0,1) //get top 5
const brand= sortedCompany[0][0]

//find avg miles
const totalRange = dataset.reduce((total, item) => {
  return total + (item.ElectricRange || 0);
},0)

const avgRange = totalRange / dataset.length;

//find the most comon year
const yearmap = {};
dataset.forEach((item) => {
  const ModelYear = item.ModelYear;
  if (ModelYear) {
    yearmap[ModelYear] = (yearmap[ModelYear] || 0) + 1;
  }
});
const topYear = Object.entries(yearmap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 1); //get top 5
const oneYear = topYear[0][0];

export const EvStatusCard = () => {
  return (
    <div className="w-full flex justify-center items-center flex-wrap mt-4 sm:mt-15 px-2 sm:px-0">
      <div className="p-2 sm:p-10">
        <div className="bg-white w-full sm:w-90 h-auto sm:h-35 rounded-lg shadow-md p-4 sm:p-5">
          <div className="flex justify-between">
            <h1 className="text-2xl sm:text-4xl font-bold">{EvCounts}</h1>
            <FaCar className="text-2xl sm:text-4xl text-green-500" />
          </div>
          <div className="pt-3 sm:pt-5">
            <p className="text-lg sm:text-xl font-semibold text-gray-500">Total EVs</p>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-10">
        <div className="bg-white w-full sm:w-90 h-auto sm:h-35 rounded-lg shadow-md p-4 sm:p-5">
          <div className="flex justify-between">
            <h1 className="text-2xl sm:text-4xl font-bold">{brand}</h1>
            <FaIndustry className="text-2xl sm:text-4xl text-blue-500" />
          </div>
          <div className="pt-3 sm:pt-5">
            <p className="text-lg sm:text-xl font-semibold text-gray-500">Leading Brand</p>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-10">
        <div className="bg-white w-full sm:w-90 h-auto sm:h-35 rounded-lg shadow-md p-4 sm:p-5">
          <div className="flex justify-between">
            <h1 className="text-2xl sm:text-4xl font-bold">{avgRange.toFixed(2)} Miles</h1>
            <FaBatteryFull className="text-2xl sm:text-4xl text-green-500" />
          </div>
          <div className="pt-3 sm:pt-5">
            <p className="text-lg sm:text-xl font-semibold text-gray-500">Avg Range</p>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-10">
        <div className="bg-white w-full sm:w-90 h-auto sm:h-35 rounded-lg shadow-md p-4 sm:p-5">
          <div className="flex justify-between">
            <h1 className="text-2xl sm:text-4xl font-bold">{oneYear}</h1>
            <FaCalendarAlt className="text-2xl sm:text-4xl text-blue-500" />
          </div>
          <div className="pt-3 sm:pt-5">
            <p className="text-lg sm:text-xl font-semibold text-gray-500">Most Common Year</p>
          </div>
        </div>
      </div>
    </div>
  );
};
