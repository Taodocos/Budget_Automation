"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { fetchSourcesById } from "@/app/service/apiFetchsource";
import { sendDataBackend, FormData } from "@/app/service/apiAddCapitalSupply";

// Define the interface for the API response
interface SourceItem {
  description: string;
  parent_code: string;
}

interface DataRow {
  id: string;
  item: string; // This will hold the selected item code from the dropdown
  quantity: string;
  unitPrice: string;
  totalBudget: string;
  quarter: string;
  New: string;
  replacement: string;
  
}

const SuplyItem = () => {
  const router = useRouter();
  const [branchCode, setBranchCode] = useState<string | null>(null);
  const [Stationary, setStationary] = useState<DataRow[]>([]);
  const [BankFormat, setBankFormat] = useState<DataRow[]>([]);
  const [Uniform, setUniform] = useState<DataRow[]>([]);
  const [OtherSupplies, setOtherSupplies] = useState<DataRow[]>([]);
  
  const [StationarySources, setStationarySources] = useState<SourceItem[]>([]);
  const [BankFormatSources, setBankFormatSources] = useState<SourceItem[]>([]);
  const [UniformSources, setUniformSources] = useState<SourceItem[]>([]);
  const [OtherSuppliesSources, setOtherSuppliesSources] = useState<SourceItem[]>([]);
  
  const [expandedGrids, setExpandedGrids] = useState<Set<string>>(new Set());

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
    if (expandedGrids.has("Stationary")) {
      setStationarySources(await fetchSources("443"));
    }
    if (expandedGrids.has("BankFormat")) {
      setBankFormatSources(await fetchSources("444"));
    }
    if (expandedGrids.has("Uniform")) {
      setUniformSources(await fetchSources("445"));
    }
    if (expandedGrids.has("OtherSupplies")) {
      setOtherSuppliesSources(await fetchSources("446"));
    }
  };

  useEffect(() => {
    fetchAllSources();
  }, [expandedGrids]);

  const toggleGrid = (heading: string) => {
    const newSet = new Set(expandedGrids);
    newSet.has(heading) ? newSet.delete(heading) : newSet.add(heading);
    setExpandedGrids(newSet);
  };

  const handleInputChange = (
    type: string,
    id: string,
    field: keyof DataRow,
    value: string
  ) => {
    // Validate numeric fields
    if ((field === "quantity" || field === "unitPrice") && isNaN(Number(value))) {
      alert("Please enter a valid number.");
      return;
    }

    const updatedData = (type === "Stationary" ? Stationary :
      type === "BankFormat" ? BankFormat :
      type === "Uniform" ? Uniform :
      OtherSupplies).map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );

    switch (type) {
      case "Stationary": setStationary(updatedData); break;
      case "BankFormat": setBankFormat(updatedData); break;
      case "Uniform": setUniform(updatedData); break;
      case "OtherSupplies": setOtherSupplies(updatedData); break;
    }
  };

  const formatData = (dataset: DataRow[]): FormData[] => {
    return dataset.map(row => ({
      item:row.item,
      quantity: row.quantity,
      unitPrice: row.unitPrice,
      totalBudget: row.totalBudget,
      parent_code: row.item, // The selected item code from the dropdown
      branch_code: branchCode, // Include branch code
      quarter: row.quarter,
      New: row.New,
      replacement: row.replacement,
    }));
  };

  const handleAddRow = (type: string) => {
    const newRow: DataRow = {
      id: (Math.random() * 1000).toString(),
      item: "",
      quantity: "",
      unitPrice: "",
      totalBudget: "",
      quarter: "",
      New: "",
      replacement: "",
    };

    switch (type) {
      case "Stationary": setStationary([...Stationary, newRow]); break;
      case "BankFormat": setBankFormat([...BankFormat, newRow]); break;
      case "Uniform": setUniform([...Uniform, newRow]); break;
      case "OtherSupplies": setOtherSupplies([...OtherSupplies, newRow]); break;
    }
  };

  const handleDeleteRow = (type: string, id: string) => {
    const updatedData = (type === "Stationary" ? Stationary :
      type === "BankFormat" ? BankFormat :
      type === "Uniform" ? Uniform :
      OtherSupplies).filter((row) => row.id !== id);

    switch (type) {
      case "Stationary": setStationary(updatedData); break;
      case "BankFormat": setBankFormat(updatedData); break;
      case "Uniform": setUniform(updatedData); break;
      case "OtherSupplies": setOtherSupplies(updatedData); break;
    }
  };

  const handleSubmit = async (type: string) => {
    const dataset = type === "Stationary" ? Stationary :
      type === "BankFormat" ? BankFormat :
      type === "Uniform" ? Uniform :
      OtherSupplies;

    const formattedData = formatData(dataset);
    
    try {
      await sendDataBackend(formattedData); // Send the formatted data to the backend
    } catch (error) {
      console.error(`Failed to submit data for ${type}`, error);
    }
  };

  const renderTable = (type: string, data: DataRow[], sources: SourceItem[]) => (
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
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Unit Price</th>
                  <th className="border p-2">Total Budget</th>
                  <th className="border p-2">Quarter</th>
                  <th className="border p-2">New</th>
                  <th className="border p-2">Replacement</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="text-sm text-gray-700">
                    <td className="border p-2">
                      <select
                        value={row.item}
                        onChange={(e) => {
                          handleInputChange(type, row.id, "item", e.target.value);
                        }}
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
                      .filter((field) => field !== "id" && field !== "source" && field !== "item")
                      .map((field) => (
                        <td key={field} className="border p-2">
                          <input
                            type="text"
                            value={row[field as keyof DataRow]}
                            onChange={(e) =>
                              handleInputChange(type, row.id, field as keyof DataRow, e.target.value)
                            }
                            className="w-full p-1 border rounded"
                          />
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
      {renderTable("Stationary", Stationary, StationarySources)} 
      {renderTable("BankFormat", BankFormat, BankFormatSources)} 
      {renderTable("Uniform", Uniform, UniformSources)} 
      {renderTable("OtherSupplies", OtherSupplies, OtherSuppliesSources)} 
    </div>
  );
};

export default SuplyItem;