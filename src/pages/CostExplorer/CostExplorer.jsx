import { useState } from "react";
import ReusableTable from "../../components/ReusableTable";
import { BarChart, ShowChart, StackedBarChart, Tune } from "@mui/icons-material";
import { displayChart } from "../../components/DisplayChart";
import FusionChart from "../../components/FusionChart";

const groups = ["Service", "Instance Type", "Account ID", "Usage Type", "Platform", "Region", "Usage Type Group", "Tags", "More"];

export default function CostExplorer() {

    const [chartType, setChartType] = useState("msline");
    const [startDate, setStartDate] = useState("2025-07-01");
    const [endDate, setEndDate] = useState("2026-03-31");

    const [selectedGroup, setSelectedGroup] = useState("Service");
    
    const serviceColumns = [
        { field: 'service', headerName: 'Service', },
        { field: 'july25', headerName: 'July 2025', },
        { field: 'aug25', headerName: 'August 2025', },
        { field: 'sept25', headerName: 'September 2025', },
        { field: 'oct25', headerName: 'October 2025', },
        { field: 'nov25', headerName: 'November 2025', },
        { field: 'dec25', headerName: 'December 2025', },
        { field: 'total', headerName: 'Total', }
    ];

    const serviceRows = [
       { service: 'Amazon EC2', july25: '$1200', aug25: '$1300', sept25: '$1250', oct25: '$1400', nov25: '$1350', dec25: '$1500', total: '$8000' },
       { service: 'Amazon S3', july25: '$800', aug25: '$850', sept25: '$900', oct25: '$950', nov25: '$1000', dec25: '$1100', total: '$5600' },
       { service: 'Amazon RDS', july25: '$600', aug25: '$650', sept25: '$700', oct25: '$750', nov25: '$800', dec25: '$850', total: '$4350' },
       { service: 'AWS Lambda', july25: '$300', aug25: '$350', sept25: '$400', oct25: '$450', nov25: '$500', dec25: '$550', total: '$2550' },
       { service: 'Amazon CloudFront', july25: '$200', aug25: '$250', sept25: '$300', oct25: '$350', nov25: '$400', dec25: '$450', total: '$1950' },
    ];

    const tableConfig = {
        Service: { columns: serviceColumns, rows: serviceRows },
        // InstanceType: { columns: instanceTypeColumns, rows: instanceTypeRows },
        // AccountID: { columns: accountIDColumns, rows: accountIDRows },
        // UsageType: { columns: usageTypeColumns, rows: usageTypeRows },
        // Platform: { columns: platformColumns, rows: platformRows },
        // Region: { columns: regionColumns, rows: regionRows },
        // UsageTypeGroup: { columns: usageTypeGroupColumns, rows: usageTypeGroupRows },
        // Tags: { columns: tagsColumns, rows: tagsRows },
        // More: { columns: moreColumns, rows: moreRows },
        
    };

    const { columns, rows } = tableConfig[selectedGroup];
    const groupKeyMap = {
    Service: "service"
    };

    const chartData = displayChart({
    columns,
    rows,
    groupKey: groupKeyMap[selectedGroup]
    });

    console.log(chartData);


    return (
    <>
      <h1 className="font-bold text-2xl mt-5 ml-5">Cost Explorer</h1>
      <p className="ml-5 mb-5 text-base text-gray-600"> How to always be aware of cost changes and history.</p>
      <div className="border border-gray-300 m-5 p-5">
        <div className="flex items-center justify-between">

        {/* Group by */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-700 mr-2">
            Group By:
          </span>

          {groups.map((group) => {
            const isActive = selectedGroup === group;

            return (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`
                  px-4 py-1.5 rounded-md text-base font-medium transition
                  ${
                    isActive
                      ? "bg-blue-800 text-white shadow"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                {group}
              </button>
            );
          })}
        </div>
        <button 
        className=" p-2 bg-blue-800 text-white rounded" ><Tune/></button>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white ml-5 pl-5 mr-5">
        <div className="text-base text-gray-600">Cost $</div>
        <div className="flex items-center justify-end bg-white">
        {/* date to be added here */}
        <div className="flex items-center gap-2 p-4">
                <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="border border-gray-300 rounded p-2"
                />
                <span className="font-medium text-gray-700">-</span>
                <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="border border-gray-300 rounded p-2"
                />
        </div>
        {/* chart icons to be added here */}
        <div className="flex items-center justify-end p-4 ">
            
            <button
            onClick={() => setChartType("msline")}
            className={`p-2 rounded ${
                chartType === "msline"
                ? "bg-blue-100 text-blue-800"
                : "text-gray-500"
            }`}
            >
            <ShowChart />
            </button>
            
            <button
            onClick={() => setChartType("mscolumn2d")}
            className={`p-2 rounded ${
                chartType === "mscolumn2d"
                ? "bg-blue-100 text-blue-800"
                : "text-gray-500"
            }`}
            >
            <BarChart />
            </button>
            
            <button
            onClick={() => setChartType("stackedcolumn2d")}
            className={`p-2 rounded ${
                chartType === "stackedcolumn2d"
                ? "bg-blue-100 text-blue-800"
                : "text-gray-500"
            }`}
            >
            <StackedBarChart />
            </button>

        </div>
      </div>
      </div>
      <div className="bg-white m-5 p-5">
            <FusionChart
            chartType={chartType}
            categories={chartData.categories}
            dataset={chartData.dataset}
            />
        </div>
      <div className="bg-white m-5 p-5">
        <ReusableTable 
            columns={tableConfig[selectedGroup].columns} 
            rows={tableConfig[selectedGroup].rows} 
        />
      </div>
    </>
  );
}