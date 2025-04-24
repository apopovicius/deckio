import { useState } from "react";

export default function Sidebar() {
  const [datePreset, setDatePreset] = useState("");

  return (
    <aside className="w-full lg:w-64 bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h2 className="text-xl font-bold mb-4">Filter</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-300">Groups / Category</h3>
        <ul className="space-y-1 text-sm">
          {["Development", "Design", "Tools", "AI/ML"].map((cat) => (
            <li key={cat}>
              <label>
                <input type="checkbox" className="mr-1" /> {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-gray-300">Created Date</h3>
        <select
          className="w-full bg-gray-700 text-white p-2 rounded text-sm"
          value={datePreset}
          onChange={(e) => setDatePreset(e.target.value)}
        >
          <option value="">-- Select range --</option>
          <option value="today">Today</option>
          <option value="last7">Last 7 days</option>
          <option value="last30">Last 30 days</option>
          <option value="thisMonth">This Month</option>
          <option value="custom">Custom Range...</option>
        </select>
        {datePreset === "custom" && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Select date range"
              className="w-full bg-gray-700 text-white p-2 rounded text-sm"
              readOnly
            />
          </div>
        )}
      </div>
    </aside>
  );
}
