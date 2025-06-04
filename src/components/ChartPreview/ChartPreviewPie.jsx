import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import "../../styles/PieChart.css";
import ChartLegend from "../ChartLegend";
import Skeleton from "../Skeleton";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const staticNepaliData = [
  { profession: "अन्य", households: 100 },
  { profession: "कृषि", households: 5000 },
  { profession: "ज्याला मजदुरी", households: 300 },
  { profession: "व्यापार", households: 250 },
  { profession: "सरकारी सेवा", households: 50 },
];

const ChartPreviewPie = ({
  labelKey = "profession",
  valueKey = "households",
  chartLabel = "पेशा",
}) => {
  const [chartData, setChartData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setChartData(staticNepaliData);
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, []);

  const generateColors = (length) => {
    return Array.from({ length }, (_, i) => {
      const hue = (i * 137.508) % 360;
      return `hsl(${hue}, 65%, 55%)`;
    });
  };

  const colors = generateColors(chartData.length);
  const labels = chartData.map((item) => item[labelKey]);
  const values = chartData.map((item) => parseFloat(item[valueKey]));
  // const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: values,
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ❗ Important to make it responsive and sharp
    plugins: {
      title: {
        display: true,
        text: "पेशाको अनुसार घरधुरी वितरण",
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
        display: false, // using custom legend
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
    <div className="barchart-container" style={{ height: 400 }}>
      {loading ? (
        <Skeleton height={400} />
      ) : (
        <>
          <Pie data={data} options={options} />
          <ChartLegend
            labels={labels}
            colors={colors}
            hoveredIndex={hoveredIndex}
          />
        </>
      )}
    </div>
  );
};

export default ChartPreviewPie;
