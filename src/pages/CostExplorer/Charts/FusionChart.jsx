import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";

// Register chart types
Charts(FusionCharts);

export default function FusionChart({ chartType, categories, dataset }) {
  const dataSource = {
    chart: {
      type: 'column2d',
      theme: "fusion",
      showValues: "0",
      xAxisName: "Month",
      yAxisName: "Cost ($)",
      numberPrefix: "$",
      drawAnchors: chartType === "msline" ? "1" : "0",
    },
    categories: [{ category: categories }],
    dataset,
  };

  return (
    <ReactFC
      type={chartType}
      width="100%"
      height="500"
      dataFormat="json"
      dataSource={dataSource}
    />
  );
}
