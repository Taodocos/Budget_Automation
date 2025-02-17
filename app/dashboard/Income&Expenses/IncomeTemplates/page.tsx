"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Updated import
import { sendDataBackend, FormData } from "@/app/service/apiAddResouceMobData";
import { fetchSourcesById } from "@/app/service/apiFetchsource";


// Define the interface for the API response
interface SourceItem {
  description: string;
  parent_code: string;
}

interface DataRow {
  id: string;
  source: string;
  actualMarch: string;
  estimatedJune: string;
  netIncrementPlan: string;
  projectedJune: string;
  Jul: string;
  Aug: string;
  Sep: string;
  Oct: string;
  Nov: string;
  Dec: string;
  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  May: string;
  Jun: string;
}

const IncomeTemplate = () => {
  const router = useRouter();
  const [branchCode, setBranchCode] = useState<string | null>(null);
  const [interestSources, setInterestSources] = useState<SourceItem[]>([]);
  const [CommissionSources, setCommissionSources] = useState<SourceItem[]>([]);
  const [otherSources, setOtherSources] = useState<SourceItem[]>([]);

  const [InterestIncome, setInterestIncome] = useState<DataRow[]>([]);
  const [CommissionIncome, setCommissionIncome] = useState<DataRow[]>([]);
  const [OtherIncome, setOtherIncome] = useState<DataRow[]>([]);
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
    if (expandedGrids.has("InterestIncome")) {
      setInterestSources(await fetchSources("83"));
    }
    if (expandedGrids.has("CommissionIncome")) {
      setCommissionSources(await fetchSources("84"));
    }
    if (expandedGrids.has("OtherIncome")) {
      setOtherSources(await fetchSources("85"));
    }
  };

  useEffect(() => {
    fetchAllSources();
  }, [expandedGrids]);

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
    value: string
  ) => {
    const updatedData = (type === "InterestIncome"
      ? InterestIncome
      : type === "CommissionIncome"
      ? CommissionIncome
      : OtherIncome).map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );

    if (type === "InterestIncome") setInterestIncome(updatedData);
    if (type === "CommissionIncome") setCommissionIncome(updatedData);
    if (type === "OtherIncome") setOtherIncome(updatedData);
  };

  const formatData = (dataset: DataRow[]): FormData[] => {
    return dataset.map(row => ({
      actual: row.actualMarch,
      estimated: row.estimatedJune,
      netincrement: row.netIncrementPlan,
      projected: row.projectedJune,
      parent_code: row.source,
      branch_code: branchCode,
      Jul: row.Jul,
      Aug: row.Aug,
      Sep: row.Sep,
      Oct: row.Oct,
      Nov: row.Nov,
      Dec: row.Dec,
      Jan: row.Jan,
      Feb: row.Feb,
      Mar: row.Mar,
      Apr: row.Apr,
      May: row.May,
      Jun: row.Jun,
    }));
  };

  const handleAddRow = (type: string) => {
    const newRow: DataRow = {
      id: (Math.random() * 1000).toString(),
      source: "",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
    };

    if (type === "InterestIncome") {
      setInterestIncome([...InterestIncome, newRow]);
    } else if (type === "CommissionIncome") {
      setCommissionIncome([...CommissionIncome, newRow]);
    } else {
      setOtherIncome([...OtherIncome, newRow]);
    }
  };

  const handleDeleteRow = (type: string, id: string) => {
    const updatedData = (type === "InterestIncome"
      ? InterestIncome
      : type === "CommissionIncome"
      ? CommissionIncome
      : OtherIncome).filter((row) => row.id !== id);

    if (type === "InterestIncome") setInterestIncome(updatedData);
    if (type === "CommissionIncome") setCommissionIncome(updatedData);
    if (type === "OtherIncome") setOtherIncome(updatedData);
  };

  const handleSubmit = async (type: string) => {
    const dataset = type === "InterestIncome"
      ? InterestIncome
      : type === "CommissionIncome"
      ? CommissionIncome
      : OtherIncome;

    const formattedData = formatData(dataset);
    
    try {
      await sendDataBackend(formattedData);
      
      // Optionally: Redirect to another page or reset state
    } catch (error) {
      console.error(`Failed to submit data for ${type}`, error);
      alert(`Failed to submit data for ${type}`);
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
                  <th className="border p-2">Sources</th>
                  <th className="border p-2">Actual March</th>
                  <th className="border p-2">Estimated June</th>
                  <th className="border p-2">Net Increment Plan</th>
                  <th className="border p-2">Projected Outstanding June</th>
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
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="text-sm text-gray-700">
                    <td className="border p-2">
                      <select
                        value={row.source}
                        onChange={(e) =>
                          handleInputChange(type, row.id, "source", e.target.value)
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
                      .filter((field) => field !== "id" && field !== "source")
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
     
      {renderTable("InterestIncome", InterestIncome, interestSources)}
      {renderTable("CommissionIncome", CommissionIncome, CommissionSources)}
      {renderTable("OtherIncome", OtherIncome, otherSources)}
    </div>
  );
};

export default IncomeTemplate;