export function displayChart({columns, rows, groupKey}) {
  // 1. Extract month columns (ignore first & total)
  const monthColumns = columns
    .map(col => col.field)
    .filter(field => field !== groupKey && field !== "total");

  // 2. Build categories
  const categories = monthColumns.map(field => {
    const column = columns.find(col => col.field === field);
    return { label: column.headerName };
  });

  // 3. Build dataset
  const dataset = rows.map(row => ({
    seriesname: row[groupKey],
    data: monthColumns.map(month => ({
      value: Number(row[month].replace("$", ""))
    }))
  }));

  return { categories, dataset };
}
