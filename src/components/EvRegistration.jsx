import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Line , Bar } from "react-chartjs-2"; // 👈 Capital L!
import dataset from "../data/Electric_Vehicle_Population_Data.json";

//find the EV date and count
const EvRegistrationMap = {};
dataset.forEach((item) => {
  const ModelYear = item.ModelYear;
  if (ModelYear) {
    EvRegistrationMap[ModelYear] = (EvRegistrationMap[ModelYear] || 0) + 1;
  }
});

const sortedYears = Object.entries(EvRegistrationMap)
  .sort().slice(0,19)
  

  

const labels = sortedYears.map(([year]) => year);
const count = sortedYears.map(([_, count]) => count);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels,
  datasets: [
    {
      label: "Number of EVs",
      data: count,
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      tension: 0.4, // curve
      fill: true, // optional: area under curve
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  layout: {
    padding: 0,
  },
};

const countyCountMap = {};
dataset.forEach((item) => {
  const County = item.County;
  if(County){
    countyCountMap[County] = (countyCountMap[County] || 0) + 1;
  }
})


const sortedCounties = Object.entries(countyCountMap).sort((a,b)=>b[1]-a[1]).slice(0,5)



const labels_c = sortedCounties.map(([county]) => county);
const counts_c = sortedCounties.map(([_, count]) => count);

const data_c = {
  labels : labels_c,
  datasets: [
    {
      label: "Number of EVs",
      data: counts_c,
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      tension: 0.4, // curve
      fill: true, // optional: area under curve
    },
  ],
};

const options_c = {
  responsive: true,
  maintainAspectRatio: true,
  indexAxis:"y",
  plugins: {
    legend: {
      position: "top",
    },
  },
  layout: {
    padding: 0,
  },
};


export const EvRegistration = () => {
  return (
    <div className="w-full h-auto sm:h-110 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 mt-6 sm:mt-12 p-2 sm:p-0">
      <div className="bg-white w-full sm:w-[50vw] h-[400px] sm:h-full rounded-lg shadow-md !p-5 sm:p-5 flex justify-center flex-col mb-4 sm:mb-0">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-4">EV Registration Trends</h1>
        <Line options={options} data={data} />
      </div>
      <div className="bg-white w-full sm:w-1/3 h-[450px] sm:h-full rounded-lg shadow-md flex flex-col p-4 sm:p-5">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 sm:mb-8 px-2">Top 5 Counties by EV Counts</h1>
        <div className="flex-1 w-full min-h-0">
          <Bar data={data_c} options={{
            ...options_c,
            maintainAspectRatio: false,
            responsive: true,
          }} />
        </div>
      </div>
    </div>
  );
};
