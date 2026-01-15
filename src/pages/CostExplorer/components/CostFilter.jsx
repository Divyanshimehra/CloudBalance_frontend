import { useState } from "react";


export default function CostFilter({filters, value, onApply, onReset}) {
  const [expanded, setExpanded] = useState(null);
  const [selected, setSelected] = useState(value || {});


  const toggleOption = (filter, option) => {
    setSelected((prev) => {
      const current = prev[filter] || [];
      return current.includes(option)
        ? { ...prev, [filter]: current.filter((o) => o !== option) }
        : { ...prev, [filter]: [...current, option] };
    });
  };

  return (
    <div className="h-full flex flex-col border-l bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-semibold">Filters</span>
        <button
          onClick={() => {
            setSelected({});
            onReset();
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 text-sm">
        {filters.map((filter) => (
          <div key={filter.filterKey}>
            <div
              className="flex items-center justify-between py-2 cursor-pointer border-b"
              onClick={() =>
                setExpanded(expanded === filter.filterKey ? null : filter.filterKey)
              }
            >
              <span>{filter.displayName}</span>
              <span className="text-xs text-gray-400">Include Only</span>
            </div>

            {expanded === filter.filterKey && (
              <div className="mt-2 ml-2 space-y-1">
                {filter.options.map(option => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(selected[filter.filterKey] || []).includes(option)}
                      onChange={() => toggleOption(filter.filterKey, option)}
                    />
                    {option}
                  </label>
                ))}

                <button
                  // onClick={() => console.log("Selected filters:", selected)}
                  onClick={() => onApply(selected)}
                  className="mt-2 px-3 py-1 bg-blue-700 text-white rounded text-sm"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
