import { useContext, useEffect, useState } from "react";
import { BarChart, ShowChart, StackedBarChart, Tune } from "@mui/icons-material";
import { DEFAULT_CHART_TYPE, DEFAULT_DATE_RANGE, GROUP_BY, MORE_GROUP_BY } from "./constants";
import CostDashboard from "./components/CostDashboard";
import CostFilter from "./components/CostFilter";
import { apiFetch } from "../../api/apiClient";
import { UserContext } from "../../Context/UserContext";


export default function CostExplorer() {

    const [chartType, setChartType] = useState(DEFAULT_CHART_TYPE);
    const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);

    const {activeAccount, user} = useContext(UserContext);

    const [filters, setFilters] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filterOptions, setFilterOptions] = useState([]);

    const visibleFilters = user?.role === "CUSTOMER"
    ? filterOptions.filter(f => f.filterKey !== "ACCOUNT_ID")
    : filterOptions;

    const [groupBy, setGroupBy] = useState(GROUP_BY[0].value);
    const [isMoreGroupOpen, setIsMoreGroupOpen] = useState(false);

    const ALL_GROUP_BY = [...GROUP_BY, ...MORE_GROUP_BY];

    const [costData, setCostData] = useState([]);

    const activeGroup = ALL_GROUP_BY.find(g => g.value === groupBy);

    //data helpers
    function monthToStartDate(month) {
      return `${month}-01`;
    }
    
    function monthToEndDate(month) {
      const d = new Date(month + "-01");
      d.setMonth(d.getMonth() + 1);
      d.setDate(0); // last day of selected month
      return d.toISOString().slice(0, 10);
    }

    // Fetch cost data 
    useEffect(() => {
      async function loadData() {

        try{      
          const res = await apiFetch("/dashboard/cost-explorer", {
            method: "POST",
            body: JSON.stringify({
              startDate: monthToStartDate(dateRange.start),
              endDate: monthToEndDate(dateRange.end),
              groupBy,
              filters:{
                ...filters,
                ...(user?.role === "CUSTOMER" 
                  ? {
                    ACCOUNT_ID: activeAccount
                    ? [String(activeAccount.accountId)]
                    : []
                  }
                  : {}),
                
              }
            }),
          });
          
          if (!res.ok) {
            throw new Error("Failed to fetch cost-explorer data");
          }
          const response = await res.json();  
          
          const activeGroup = ALL_GROUP_BY.find(g => g.value === groupBy);
          const groupKey = activeGroup.dataKey;

          const mappedRows = response.rows.map(row => ({
            [groupKey]: typeof row.groupKey === "object"
              ? row.groupKey[groupBy]
              : row.groupKey,
            monthlyCost: row.monthlyCost,
          }));

          setCostData(mappedRows);
        } catch (err) {
          console.error(err);
        } 
      }

      loadData();
    }, [groupBy, dateRange, filters, activeAccount]);


    // Fetch filters
    useEffect(() => {
      async function loadFilters(){
        try{
          const res = await apiFetch("/dashboard/cost-explorer/filters");
          
          if (!res.ok) {
            throw new Error("Failed to fetch filters");
          }

          const data = await res.json();
          setFilterOptions(data);
        } catch (err) {
          console.error(err);
        }
      }

      loadFilters();
    }, []);



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

          {GROUP_BY.map((group) => {
            const isActive = groupBy === group.value;

            return (
              <button
                key={group.value}
                onClick={() => {
                  setGroupBy(group.value); 
                  setIsMoreGroupOpen(false);
                }}
                className={`
                  px-4 py-1.5 rounded-md text-base font-medium
                  ${
                    isActive
                      ? "bg-blue-800 text-white shadow"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                {group.label}
              </button>
            );
          })}
          <div className="relative">
            <button
            onClick={() => setIsMoreGroupOpen(prev => !prev)}
            className="px-4 py-1.5 rounded-md bg-gray-100 text-gray-700"
            > More ▾
            </button>
            {isMoreGroupOpen && (
              <div className="absolute z-50 mt-2 w-56 bg-white border rounded shadow">
                {MORE_GROUP_BY.map(opt => (
                  <div
                  key={opt.value}
                  onClick={() => {
                    setGroupBy(opt.value);
                    setIsMoreGroupOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
        // onClick={() => setIsFilterOpen(true)}
        onClick={() => setIsFilterOpen((prev) => !prev)}
        className="p-2 bg-blue-800 text-white rounded hover:bg-blue-700">
          <Tune />
        </button>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white ml-5 pl-5 mr-5">
        <div className="text-base text-gray-600">Cost $</div>
        <div className="flex items-center justify-end bg-white">
        {/* date to be added here */}
        <div className="flex items-center gap-2 p-4">
                <input 
                type="month" 
                value={dateRange.start} 
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value}))} 
                className="border border-gray-300 rounded p-2"
                />
                <span className="font-medium text-gray-700">-</span>
                <input 
                type="month" 
                value={dateRange.end} 
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value}))} 
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
      <div className="flex m-5 bg-white border rounded overflow-hidden "
       style={{ maxWidth: isFilterOpen ? "100%" : "99%" }}>
        {/* LEFT: chart + table */}
        <CostDashboard
          chartType={chartType}
          groupKey={activeGroup.dataKey}
          dateRange={dateRange}
          data={costData}
        />

        {/* RIGHT: filter panel */}
        <div 
        className={`bg-gray-100 transition-all duration-300 ease-in-out`}
        style={{ width: isFilterOpen ? "15%" : "0" }}>
          {isFilterOpen && (
            <CostFilter
             filters={visibleFilters}
             value={filters}
             onApply={(selectedFilters) => {
                setFilters(selectedFilters);
                setIsFilterOpen(false);
              }}
              onReset={() => setFilters({})}
            />
          )}
        </div>
      </div>

    </>
  );
}


