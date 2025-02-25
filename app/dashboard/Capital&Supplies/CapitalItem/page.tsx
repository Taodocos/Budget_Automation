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
  quarter: string;
  New: string;
  replacement: string;
}

// Define a type for the keys of ids
type IdType = 
    | 'FurnitureAndFittings' 
    | 'OfficeAndOtherEquipment' 
    | 'ComputerAndRelatedItem' 
    | 'Vechile' 
    | 'Building' 
    | 'ATMAndPos' 
    | 'CaunterAndPartitions';

// Define the ids object with the specific type
const ids: Record<IdType, string> = {
  FurnitureAndFittings: "01",
  OfficeAndOtherEquipment: "02",
  ComputerAndRelatedItem: "03",
  Vechile: "04",
  Building: "05",
  ATMAndPos: "06",
  CaunterAndPartitions: "07",
};

const CapitalItem = () => {
  const router = useRouter();
  const [branchCode, setBranchCode] = useState<string | null>(null);

  // State for each category
  const [FurnitureAndFittings, setFurnitureAndFittings] = useState<DataRow[]>([]);
  const [OfficeAndOtherEquipment, setOfficeAndOtherEquipment] = useState<DataRow[]>([]);
  const [ComputerAndRelatedItem, setComputerAndRelatedItem] = useState<DataRow[]>([]);
  const [Vechile, setVechile] = useState<DataRow[]>([]);
  const [Building, setBuilding] = useState<DataRow[]>([]);
  const [ATMAndPos, setATMAndPos] = useState<DataRow[]>([]);
  const [CaunterAndPartitions, setCaunterAndPartitions] = useState<DataRow[]>([]);

  const [sources, setSources] = useState<SourceItem[]>([]);
  const [expandedGrids, setExpandedGrids] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedBranchCode = sessionStorage.getItem("branch_code");
    setBranchCode(storedBranchCode);
  }, []);

  const fetchSources = async (id: string) => {
    try {
        const data = await fetchSourcesById(id);
        if (data && data.length > 0) {
            // Map to the desired structure
            return data.map((item: { itemName: string; itemCode: string }) => ({
                description: item.itemName,  
                parent_code: item.itemCode,   
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
    const sourcesData = [];

    for (const [key, value] of Object.entries(ids)) {
      if (expandedGrids.has(key)) {
        const fetchedSources = await fetchSources(value);
        sourcesData.push(...fetchedSources); // Spread to flatten the array
      }
    }

    // Set the sources state
    setSources(sourcesData);
  };

  useEffect(() => {
    fetchAllSources();
  }, [expandedGrids]);  // Trigger when expandedGrids changes

  const toggleGrid = (heading: string) => {
    const newSet = new Set(expandedGrids);
    newSet.has(heading) ? newSet.delete(heading) : newSet.add(heading);
    setExpandedGrids(newSet);
  };

  const handleInputChange = (
    type: IdType,
    id: string,
    field: keyof DataRow,
    value: string
  ) => {
    const updateData = (setData: React.Dispatch<React.SetStateAction<DataRow[]>>, data: DataRow[]) => {
      setData(data.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    };

    switch (type) {
      case "FurnitureAndFittings": updateData(setFurnitureAndFittings, FurnitureAndFittings); break;
      case "OfficeAndOtherEquipment": updateData(setOfficeAndOtherEquipment, OfficeAndOtherEquipment); break;
      case "ComputerAndRelatedItem": updateData(setComputerAndRelatedItem, ComputerAndRelatedItem); break;
      case "Vechile": updateData(setVechile, Vechile); break;
      case "Building": updateData(setBuilding, Building); break;
      case "ATMAndPos": updateData(setATMAndPos, ATMAndPos); break;
      case "CaunterAndPartitions": updateData(setCaunterAndPartitions, CaunterAndPartitions); break;
    }
  };

  const handleAddRow = (type: IdType) => {
    const newRow: DataRow = {
      id: (Math.random() * 1000).toString(),
      item: "",
      quantity: "",
      quarter: "",
      New: "",
      replacement: "",
    };

    switch (type) {
      case "FurnitureAndFittings": setFurnitureAndFittings([...FurnitureAndFittings, newRow]); break;
      case "OfficeAndOtherEquipment": setOfficeAndOtherEquipment([...OfficeAndOtherEquipment, newRow]); break;
      case "ComputerAndRelatedItem": setComputerAndRelatedItem([...ComputerAndRelatedItem, newRow]); break;
      case "Vechile": setVechile([...Vechile, newRow]); break;
      case "Building": setBuilding([...Building, newRow]); break;
      case "ATMAndPos": setATMAndPos([...ATMAndPos, newRow]); break;
      case "CaunterAndPartitions": setCaunterAndPartitions([...CaunterAndPartitions, newRow]); break;
    }
  };

  const handleDeleteRow = (type: IdType, id: string) => {
    const updatedData = (data: DataRow[]) => data.filter((row) => row.id !== id);

    switch (type) {
      case "FurnitureAndFittings": setFurnitureAndFittings(updatedData(FurnitureAndFittings)); break;
      case "OfficeAndOtherEquipment": setOfficeAndOtherEquipment(updatedData(OfficeAndOtherEquipment)); break;
      case "ComputerAndRelatedItem": setComputerAndRelatedItem(updatedData(ComputerAndRelatedItem)); break;
      case "Vechile": setVechile(updatedData(Vechile)); break;
      case "Building": setBuilding(updatedData(Building)); break;
      case "ATMAndPos": setATMAndPos(updatedData(ATMAndPos)); break;
      case "CaunterAndPartitions": setCaunterAndPartitions(updatedData(CaunterAndPartitions)); break;
    }
  };

  const formatData = (dataset: DataRow[], type: IdType): FormData[] => {
    const parent_code = ids[type]; // Get the parent code based on the type
    return dataset.map(row => ({
      item: row.item,
      quantity: row.quantity,
      parent_code: parent_code, // Use the parent_code from the ids object
      branch_code: branchCode, // Include branch code
      quarter: row.quarter,
      New: row.New,
      replacement: row.replacement,
    }));
  };

  const handleSubmit = async (type: IdType) => {
    const dataset = type === "FurnitureAndFittings" ? FurnitureAndFittings :
      type === "OfficeAndOtherEquipment" ? OfficeAndOtherEquipment :
      type === "ComputerAndRelatedItem" ? ComputerAndRelatedItem :
      type === "Vechile" ? Vechile :
      type === "Building" ? Building :
      type === "ATMAndPos" ? ATMAndPos :
      CaunterAndPartitions;

    const formattedData = formatData(dataset, type); // Pass the type to formatData
    try {
      await sendDataBackend(formattedData);
      alert("Data submitted successfully");
    } catch (error) {
      console.error("Failed to submit data", error);
      alert("Failed to submit data");
    }
  };

  const renderTable = (type: IdType, data: DataRow[]) => (
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
                      .filter((field) => field !== "id" && field !== "item") // Exclude item from here
                      .map((field) => (
                        <td key={field} className="border p-2">
                          <input
                            type="text"
                            value={row[field as keyof DataRow]}
                            onChange={(e) => {
                              handleInputChange(type, row.id, field as keyof DataRow, e.target.value);
                            }}
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
      {renderTable("FurnitureAndFittings", FurnitureAndFittings)}
      {renderTable("OfficeAndOtherEquipment", OfficeAndOtherEquipment)}
      {renderTable("ComputerAndRelatedItem", ComputerAndRelatedItem)}
      {renderTable("Vechile", Vechile)}
      {renderTable("Building", Building)}
      {renderTable("ATMAndPos", ATMAndPos)}
      {renderTable("CaunterAndPartitions", CaunterAndPartitions)}
    </div>
  );
};

export default CapitalItem;