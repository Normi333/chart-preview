import ChartPreview from "./components/ChartPreview/ChartPreview";
import ChartCard from "./components/ChartCard";
import ChartPreviewPie from "./components/ChartPreview/ChartPreviewPie";
import "./styles/App.css";
function App() {
  // return (
  //   <div className="App">
  //     <h1>नगरहरूको जनसंख्या चार्ट</h1>
  //     {/* <ChartPreview
  //       apiUrl="https://nepali-api.example.com/data"
  //       labelKey="title_np"
  //       valueKey="budget_amount"
  //       chartLabel="नेपाल बजेट विवरण"
  //       chartType="doughnut"
  //     /> */}
  //     <ChartPreview
  //       labelKey="name_np"
  //       valueKey="population"
  //       chartLabel="नगरहरूको जनसंख्या चार्ट"
  //     />
  //   </div>
  // );
  return (
    <>
      <ChartCard title="पेशाको अनुसार घरधुरी">
        <ChartPreview
          labelKey="profession"
          valueKey="households"
          chartLabel="पेशा"
        />
      </ChartCard>
      <ChartCard title="पेशाको अनुसार घरधुरी">
        <ChartPreviewPie
          labelKey="profession"
          valueKey="households"
          chartLabel="पेशा"
        />
      </ChartCard>
    </>
  );
}
export default App;
