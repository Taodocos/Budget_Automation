"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 

import { fetchSourcesById } from "@/app/service/apiFetchsource";
import { FormSubmissionData, sendDataBackend } from "@/app/service/addhumanres";
import SuplyItem from "../Capital&Supplies/SuplyItem/page";
import ExpenseTemplate from "../Income&Expenses/ExpenseTemplates/page";

interface SourceItem {
  description: string;
  parent_code: string;
}

interface DataRow {
  id: string;
  title: string;
  existingStaff: string;
  additionalStaff: string;
  jul: string;  
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  new: number; 
  replacement: number; 
}

const ManPower = () => {
  const router = useRouter();
  const [branchCode, setBranchCode] = useState<string | null>(null);
  const [expandedGrids, setExpandedGrids] = useState<Set<string>>(new Set());
  const [dataRows, setDataRows] = useState<DataRow[]>([]); 
  const [sources, setSources] = useState<SourceItem[]>([]); 

  useEffect(() => {
    const storedBranchCode = sessionStorage.getItem("branch_code");
    setBranchCode(storedBranchCode);
  }, []);

  const fetchSources = async (id: string) => {
    try {
      const data = await fetchSourcesById(id);
      if (data && data.length > 0) {
        return data.map((item: SourceItem) => ({
          description: item.description,
          parent_code: item.parent_code,
        }));
      } else {
        console.warn("No sources found for ID:", id);
        return [];
      }
    } catch (error) {
      console.error("Error fetching sources:", error);
      return [];
    }
  };

  const fetchAllSources = async () => {
    const sources = await fetchSources(branchCode || "");
    setSources(sources);
  };

  useEffect(() => {
    fetchAllSources();
  }, [branchCode]);

  const toggleGrid = (heading: string) => {
    const newSet = new Set(expandedGrids);
    if (newSet.has(heading)) {
      newSet.delete(heading);
    } else {
      newSet.add(heading);
    }
    setExpandedGrids(newSet);
  };

  const handleInputChange = (
    type: string,
    id: string,
    field: keyof DataRow,
    value: any // Allow any type for flexibility
  ) => {
    setDataRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleAddRow = (type: string) => {
    const newRow: DataRow = {
      id: (Math.random() * 1000).toString(),
      title: "",
      existingStaff: "",
      additionalStaff: "",
      jul: "",
      aug: "",
      sep: "",
      oct: "",
      nov: "",
      dec: "",
      jan: "",
      feb: "",
      mar: "",
      apr: "",
      may: "",
      jun: "",
      new: 0, // Set to boolean
      replacement: 0 // Set to boolean
    };
    setDataRows((prev) => [...prev, newRow]);
  };

  const handleDeleteRow = (type: string, id: string) => {
    const updatedData = dataRows.filter((row) => row.id !== id);
    setDataRows(updatedData);
  };

  const formatData = (dataset: DataRow[]): FormSubmissionData[] => {
    return dataset.map(row => ({
      existingStaff: row.existingStaff,
      additionalStaff: row.additionalStaff,
      parent_code: row.title,
      branch_code: branchCode || "",
      jul: row.jul,
      aug: row.aug,
      sep: row.sep,
      oct: row.oct,
      nov: row.nov,
      dec: row.dec,
      jan: row.jan,
      feb: row.feb,
      mar: row.mar,
      apr: row.apr,
      may: row.may,
      jun: row.jun,
      new: row.new ? 1 : 0, 
        replacement: row.replacement ? 1 : 0 , 
    }));
  };

  const handleSubmit = async (type: string) => {
    const formattedData: FormSubmissionData[] = formatData(dataRows);

    try {
      await sendDataBackend(formattedData);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error(`Failed to submit data for ${type}`, error);
      alert(`Failed to submit data for ${type}`);
    }
  };

  const renderTable = (type: string) => (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2
        className="font-bold text-xl mb-2 text-black cursor-pointer"
        onClick={() => toggleGrid(type)}
      >
        {expandedGrids.has(type) ? "−" : "+"} {type.replace(/([A-Z])/g, ' $1')}
      </h2>
      {expandedGrids.has(type) && (
        <div>
          <div className="flex justify-end items-center mb-2">
            <button
              onClick={() => handleAddRow(type)}
              className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow"
            >
              + Add 
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                  <th className="border p-2">Position</th>
                  <th className="border p-2">Existing Staff</th>
                  <th className="border p-2">Additional Staff</th>
                  <th className="border p-2">Jul</th>
                  <th className="border p-2">Aug</th>
                  <th className="border p-2">Sep</th>
                  <th className="border p-2">Oct</th>
                  <th className="border p-2">Nov</th>
                  <th className="border p-2">Dec</th>
                  <th className="border p-2">Jan</th>
                  <th className="border p-2">Feb</th>
                  <th className="border p-2">Mar</th>
                  <th className="border p-2">Apr</th>
                  <th className="border p-2">May</th>
                  <th className="border p-2">Jun</th>
                  <th className="border p-2">New</th>
                  <th className="border p-2">Replacement</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row) => (
                  <tr key={row.id} className="text-sm text-gray-700">
                    <td className="border p-2">
                      <select
                        value={row.title}
                        onChange={(e) =>
                          handleInputChange(type, row.id, "title", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      >
                        <option value="">Select</option>
                        {sources.map((source) => (
                          <option key={source.parent_code} value={source.parent_code}>
                            {source.description}
                          </option>
                        ))}
                      </select>
                    </td>
                    {Object.keys(row)
                      .filter((field) => field !== "id" && field !== "title")
                      .map((field) => (
                        <td key={field} className="border p-2">
                      {field === "new" || field === "replacement" ? (
    <input
        type="checkbox"
        checked={field === "new" ? row.new === 1 : row.replacement === 1} // Ensure this is a boolean
        onChange={(e) =>
            handleInputChange(type, row.id, field as keyof DataRow, e.target.checked ? 1 : 0) // Send 1 or 0 to the state
        }
        className="w-full"
    />
) : (
    <input
        type="text"
        value={row[field as keyof DataRow] || ''} // Ensure this is a string
        onChange={(e) =>
            handleInputChange(type, row.id, field as keyof DataRow, e.target.value)
        }
        className="w-full p-1 border rounded"
    />
)}
                        </td>
                      ))}
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDeleteRow(type, row.id)}
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
          <div className="mt-4">
            <button
              onClick={() => handleSubmit(type)}
              className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow"
            >
              Submit 
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-auto">
      {renderTable("ManPower")}
     <ExpenseTemplate/>
    </div>
  );
};

export default ManPower;