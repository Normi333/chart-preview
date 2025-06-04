import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import "../../styles/PieChart.css";
import ChartLegend from "../ChartLegend";

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

  useEffect(() => {
    setChartData(staticNepaliData);
  }, []);

  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

  const data = {
    labels: chartData.map((item) => item[labelKey]),
    datasets: [
      {
        label: chartLabel,
        data: chartData.map((item) => parseFloat(item[valueKey])),
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
        display: false, // use custom ChartLegend instead
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
    <div className="barchart-container">
      <Pie data={data} options={options} />
      {chartData.length > 0 && (
        <ChartLegend
          labels={data.labels}
          colors={colors}
          hoveredIndex={hoveredIndex}
        />
      )}
    </div>
  );
};

export default ChartPreviewPie;
