import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataSet from "../data/Electric_Vehicle_Population_Data.json";

ChartJS.register(ArcElement, Tooltip, Legend);

const makeCountEvType = {};

dataSet.forEach((item) => {
  const ElectricVehicleType = item.ElectricVehicleType;
  if (ElectricVehicleType) {
    makeCountEvType[ElectricVehicleType] =
      (makeCountEvType[ElectricVehicleType] || 0) + 1;
  }
});



const labelMap = {
  "Battery Electric Vehicle (BEV)": "BEV",
  "Plug-in Hybrid Electric Vehicle (PHEV)": "PHEV",
};


const labels = Object.keys(makeCountEvType).map((key)=> labelMap[key]);
const count = Object.values(makeCountEvType);



const data = {
  labels,
  datasets: [
    {
      label: "EV Distribution",
      data: count, // two values
      backgroundColor: ["#28B463", "#3498DB"],
      borderWidth: 0, // optional: removes white borders between slices
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 18,
        },
      },
    },
  },
};

export const EvTypeChart = () => {
  return (
    <>
      <div className="w-full mb-6 sm:mb-8 flex justify-start items-start">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-5">EV Distribution</h1>
      </div>
      <div className="w-48 h-48 sm:w-64 sm:h-64 mb-8 sm:mb-20">
        <Pie data={data} options={{
          ...options,
          plugins: {
            ...options.plugins,
            legend: {
              ...options.plugins.legend,
              labels: {
                font: {
                  
                  size: window.innerWidth < 640 ? 14 : 18,
                },
              },
            },
          },
        }} />
      </div>
    </>
  );
};
