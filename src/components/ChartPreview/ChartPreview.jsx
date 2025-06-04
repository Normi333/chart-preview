// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar, Pie, Doughnut } from "react-chartjs-2";
// import "../../styles/ChartPreview.css";
// import ChartLegend from "../ChartLegend";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   BarElement,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// const ChartPreview = ({
//   apiUrl,
//   labelKey,
//   valueKey,
//   chartLabel,
//   chartType = "bar", // can be 'bar', 'pie', or 'doughnut'
// }) => {
//   const [chartData, setChartData] = useState([]);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   const generateColors = (length) => {
//     return Array.from({ length }, (_, i) => {
//       const hue = (i * 137.508) % 360;
//       return `hsl(${hue}, 65%, 55%)`;
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(apiUrl);
//         const json = await res.json();

//         // Fallback logic to handle flexible JSON structure
//         const dynamicData = json?.data?.coins || json?.data || json;
//         setChartData(Array.isArray(dynamicData) ? dynamicData : []);
//         console.log(dynamicData);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };

//     fetchData();
//   }, [apiUrl]);

//   const colors = generateColors(chartData.length);

//   const data = {
//     labels: chartData.map((item) => item[labelKey]),
//     datasets: [
//       {
//         label: chartLabel || "चार्ट डाटा",
//         data: chartData.map((item) => parseFloat(item[valueKey])),
//         backgroundColor: colors,
//         borderColor: chartType === "bar" ? colors : undefined,
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         enabled: true,
//         callbacks: {
//           label: (context) => `${context.label}: ${context.formattedValue}`,
//         },
//       },
//       legend: {
//         display: false,
//       },
//     },
//     onHover: (event, chartElements) => {
//       if (chartElements.length > 0) {
//         setHoveredIndex(chartElements[0].index);
//       } else {
//         setHoveredIndex(null);
//       }
//     },
//     scales:
//       chartType === "bar"
//         ? {
//             y: { beginAtZero: true },
//           }
//         : {},
//   };

//   const ChartComponent =
//     chartType === "bar" ? Bar : chartType === "pie" ? Pie : Doughnut;

//   return (
//     <div className="barchart-container">
//       <ChartComponent data={data} options={options} height={400} />
//       <ChartLegend
//         labels={data.labels}
//         colors={colors}
//         hoveredIndex={hoveredIndex}
//       />
//     </div>
//   );
// };

// export default ChartPreview;

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../../styles/ChartPreview.css";
import ChartLegend from "../ChartLegend";
import Skeleton from "../Skeleton"; // NEW: Import a basic skeleton component

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const staticNepaliData = [
  { profession: "अन्य", households: 100 },
  { profession: "कृषि", households: 5000 },
  { profession: "ज्याला मजदुरी", households: 300 },
  { profession: "व्यापार", households: 250 },
  { profession: "सरकारी सेवा", households: 50 },
];

const ChartPreview = ({
  labelKey = "profession",
  valueKey = "households",
  chartLabel = "पेशा",
}) => {
  const [chartData, setChartData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setChartData(staticNepaliData);
      setLoading(false); // Set loading to false after data is set
    }, 1500); // adjust as needed or replace with actual API
  }, []);

  const generateColors = (length) => {
    return Array.from({ length }, (_, i) => {
      const hue = (i * 137.508) % 360;
      return `hsl(${hue}, 65%, 55%)`;
    });
  };

  const colors = generateColors(chartData.length);
  // const defaultColor = "rgb(31, 119, 180)";

  const data = {
    labels: chartData.map((item) => item[labelKey]),
    datasets: [
      {
        label: chartLabel,
        data: chartData.map((item) => parseFloat(item[valueKey])),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "पेशाको अनुसार घरधुरी वृत्तचित्र",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.formattedValue}`,
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    onHover: (event, chartElements) => {
      if (chartElements.length > 0) {
        setHoveredIndex(chartElements[0].index);
      } else {
        setHoveredIndex(null);
      }
    },
  };

  return (
    // <div className="barchart-container">
    //   {loading ? (
    //     <Skeleton height={400} />
    //   ) : (
    //     <>
    //       <Bar data={data} options={options} height={400} />
    //       <ChartLegend
    //         labels={data.labels}
    //         colors={colors}
    //         hoveredIndex={hoveredIndex}
    //       />
    //     </>
    //   )}
    // </div>
    <div className="barchart-container">
      {loading && <Skeleton height={400} />}
      {!loading && (
        <>
          <Bar data={data} options={options} height={400} />
          <ChartLegend
            labels={data.labels}
            colors={colors}
            hoveredIndex={hoveredIndex}
          />
        </>
      )}
    </div>
  );
};

export default ChartPreview;
