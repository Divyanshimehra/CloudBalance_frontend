import FusionChart from "../Charts/FusionChart";
import ReusableTable from "../../../components/ReusableTable";
import { displayChart } from "../Charts/DisplayChart";
import dayjs from "dayjs";

function getMonthsInRange(start, end) {
  const months = [];
  let current = dayjs(start).startOf("month");
  const last = dayjs(end).startOf("month");

  while (current.isBefore(last) || current.isSame(last)) {
    months.push(current.format("YYYY-MM"));
    current = current.add(1, "month");
  }

  return months;
}

function buildColumns(groupKey, months) {
  if (!groupKey) {
    throw new Error("groupKey is required to build columns");
  }
  return [
    {
      field: groupKey,
      headerName: groupKey
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (ch) => ch.toUpperCase()),
    },
    ...months.map((month) => ({
      field: month,
      headerName: dayjs(month).format("MMM YYYY"),
    })),
    {
      field: "total",
      headerName: "Total",
    },
  ];
}

function buildRows(data, groupKey, months) {
  return data.map((item) => {
    const row = {
      [groupKey]: item[groupKey],
    };

    let total = 0;
    months.forEach((month) => {
      const cost = item.monthlyCost[month] || 0;
      // row[month] = `$${cost}`;
      row[month] = cost;
      total += cost;
    });

    // row["total"] = `$${total}`;
    row.total = total;

    return row;
  });
}

function formatRowsForTable(rows, months) {
  return rows.map((row) => {
    const formattedRow = { ...row };

    months.forEach((month) => {
      formattedRow[month] = `$${row[month]}`;
    });

    formattedRow.total = `$${row.total}`;

    return formattedRow;
  });
}



//CostDashboard Responsibility: Prepare chart + table data
export default function CostDashboard({
  chartType,
  data,
  groupKey,
  dateRange
}) {
    const months = getMonthsInRange(dateRange.start, dateRange.end);
    const columns = buildColumns(groupKey, months);
    const rows = buildRows(data, groupKey, months);
    const tableRows = formatRowsForTable(rows, months);

    const chartData = displayChart({
        columns,
        rows,
        groupKey,
    });

  return (
    <>
      <div 
        className={"flex-1 min-w-0 transition-all duration-300 ease-in-out"}>
          <div className="p-5 border-b ">
            <FusionChart
            chartType={chartType}
            categories={chartData.categories}
            dataset={chartData.dataset}
            />
          </div>
          <div className="p-5">
            <ReusableTable 
            columns={columns}
            rows={tableRows}
            />
          </div>
        </div>
    </>
  );
}
