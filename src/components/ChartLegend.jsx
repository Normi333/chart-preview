// import React from "react";
// import "../styles/ChartLegend.css";

// const ChartLegend = ({ labels, colors, hoveredIndex }) => {
//   return (
//     <div className="chart-legend-container">
//       <ul className="chart-legend">
//         {labels.map((label, i) => (
//           <li
//             key={i}
//             className={hoveredIndex === i ? "highlighted" : ""}
//             style={{ color: colors[i] }}
//           >
//             <span
//               className="legend-color"
//               style={{ backgroundColor: colors[i] }}
//             ></span>
//             {label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChartLegend;

import React from "react";
import "../styles/ChartLegend.css";

const ChartLegend = ({ labels, colors, hoveredIndex }) => {
  return (
    <div className="chart-legend-container">
      <ul className="chart-legend">
        {labels.map((label, i) => (
          <li
            key={i}
            className={hoveredIndex === i ? "highlighted" : ""}
            style={{ color: colors[i] }}
          >
            <span
              className="legend-color"
              style={{ backgroundColor: colors[i] }}
            ></span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartLegend;


