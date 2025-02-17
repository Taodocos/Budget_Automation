"use client";

import { useState } from "react";

// Define the type for the data rows
interface DataRow {
  id: string; // Keep id as string
  source: string;
  branchCode: string;
  branchName: string;
  district: string;
  region: string;
  actualMarch2025: string;
  estimatedJune2025: string;
  netIncrementPlan: string;
  projectedJune2026: string;
  quarterlyNetIncrement: string;
  monthlyNetIncrement: string;
}

const CapitalExpenditure = () => {
  const [data, setData] = useState<DataRow[]>([
    {
      id: "1",
      source: "",
      branchCode: "",
      branchName: "",
      district: "",
      region: "",
      actualMarch2025: "",
      estimatedJune2025: "",
      netIncrementPlan: "",
      projectedJune2026: "",
      quarterlyNetIncrement: "",
      monthlyNetIncrement: "",
    },
  ]);

  const handleInputChange = (id: string, field: keyof DataRow, value: string) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setData(updatedData);
  };

  const handleAddRow = () => {
    // Generate a new ID based on existing data
    const lastId = data.length > 0 ? Math.max(...data.map(row => parseInt(row.id))) : 0; // Get maximum ID as number
    const newRow: DataRow = {
      id: (lastId + 1).toString(), // Convert ID to string
      source: "",
      branchCode: "",
      branchName: "",
      district: "",
      region: "",
      actualMarch2025: "",
      estimatedJune2025: "",
      netIncrementPlan: "",
      projectedJune2026: "",
      quarterlyNetIncrement: "",
      monthlyNetIncrement: "",
    };
    setData([...data, newRow]); // Add the new row to the data array
  };

  const handleDeleteRow = (id: string) => { // Keep id as string
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", data);
    alert("Data submitted successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Operational Formats</h1>
        <button
          onClick={handleAddRow}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          + Add Format
        </button>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="border p-2">Sources</th>
                <th className="border p-2">Branch Code</th>
                <th className="border p-2">Branch Name</th>
                <th className="border p-2">District</th>
                <th className="border p-2">Region</th>
                <th className="border p-2">Actual March 2025</th>
                <th className="border p-2">Estimated June 2025</th>
                <th className="border p-2">Net Increment Plan</th>
                <th className="border p-2">Projected June 2026</th>
                <th className="border p-2">Quarterly Net Increment</th>
                <th className="border p-2">Monthly Net Increment</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="text-sm text-gray-700">
                  {Object.keys(row)
                    .filter((field) => field !== "id")
                    .map((field) => (
                      <td key={field} className="border p-2">
                        <input
                          type="text"
                          value={row[field as keyof DataRow]}
                          onChange={(e) =>
                            handleInputChange(
                              row.id,
                              field as keyof DataRow,
                              e.target.value
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                    </td>
                    ))}
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CapitalExpenditure;