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
import dataset from "../data/Electric_Vehicle_Population_Data.json"
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//find the number of each make
const makeCountMap = {}
dataset.forEach((item)=>{ 
  const make = item.Make ;
  if(make){
    makeCountMap[make] = (makeCountMap[make] || 0) + 1;
  }
})


const sortedCompany = Object.entries(makeCountMap).sort((a,b)=>b[1]-a[1]).slice(0,5) //get top 5

const labels = sortedCompany.map(([make])=>make) 
const count = sortedCompany.map(([_,count])=>count)

const data = {
  labels,
  datasets: [
    {
      label: "Number of EVs",

      data: count,
      backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
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

export const ManufacturesChart = () => {
  return (
    <div className="w-full h-auto sm:h-110 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 p-2 sm:p-0">
      <div className="bg-white w-full sm:w-[50vw] h-[400px] sm:h-full rounded-lg shadow-md p-3 sm:p-5 flex justify-center flex-col mb-4 sm:mb-0">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Top Manufacturers</h1>
        <div className="w-full h-full flex justify-center items-center">
          <Bar options={options} data={data} />
        </div>
      </div>
      <div className="bg-white w-full sm:w-1/3 h-[400px] sm:h-full rounded-lg shadow-md flex justify-around items-center flex-col">
        <EvTypeChart></EvTypeChart>
      </div>
    </div>
  );
};
