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

const CapitalItem = () => {
  const router = useRouter();
  const [branchCode, setBranchCode] = useState<string | null>(null);

  // State for each category
  const [OfficeFurniture, setOfficeFurniture] = useState<DataRow[]>([]);
  const [OfficeEquipment, setOfficeEquipment] = useState<DataRow[]>([]);
  const [ITHardware, setITHardware] = useState<DataRow[]>([]);
  const [OtherITItems, setOtherITItems] = useState<DataRow[]>([]);
  const [SecurityItems, setSecurityItems] = useState<DataRow[]>([]);
  const [Vechile, setVechile] = useState<DataRow[]>([]);
  const [CounterAndAl, setCounterAndAl] = useState<DataRow[]>([]);
  const [OtherItemDigBank, setOtherItemDigBank] = useState<DataRow[]>([]);
  const [ProjectCap, setProjectCap] = useState<DataRow[]>([]);

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
    const sourcesData = [];
    const ids = {
      OfficeFurniture: "434",
      OfficeEquipment: "435",
      ITHardware: "436",
      OtherITItems: "437",
      SecurityItems: "438",
      Vechile: "439",
      CounterAndAl: "440",
      OtherItemDigBank: "441",
      ProjectCap: "442",
    };

    for (const [key, value] of Object.entries(ids)) {
      if (expandedGrids.has(key)) {
        sourcesData.push(await fetchSources(value));
      }
    }

    // Flatten the array of arrays and set sources
    setSources(sourcesData.flat());
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
    type: string,
    id: string,
    field: keyof DataRow,
    value: string
  ) => {
    const updateData = (setData: React.Dispatch<React.SetStateAction<DataRow[]>>, data: DataRow[]) => {
      setData(data.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
    };

    switch (type) {
      case "OfficeFurniture": updateData(setOfficeFurniture, OfficeFurniture); break;
      case "OfficeEquipment": updateData(setOfficeEquipment, OfficeEquipment); break;
      case "ITHardware": updateData(setITHardware, ITHardware); break;
      case "OtherITItems": updateData(setOtherITItems, OtherITItems); break;
      case "SecurityItems": updateData(setSecurityItems, SecurityItems); break;
      case "Vechile": updateData(setVechile, Vechile); break;
      case "CounterAndAl": updateData(setCounterAndAl, CounterAndAl); break;
      case "OtherItemDigBank": updateData(setOtherItemDigBank, OtherItemDigBank); break;
      case "ProjectCap": updateData(setProjectCap, ProjectCap); break;
    }
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
      case "OfficeFurniture": setOfficeFurniture([...OfficeFurniture, newRow]); break;
      case "OfficeEquipment": setOfficeEquipment([...OfficeEquipment, newRow]); break;
      case "ITHardware": setITHardware([...ITHardware, newRow]); break;
      case "OtherITItems": setOtherITItems([...OtherITItems, newRow]); break;
      case "SecurityItems": setSecurityItems([...SecurityItems, newRow]); break;
      case "Vechile": setVechile([...Vechile, newRow]); break;
      case "CounterAndAl": setCounterAndAl([...CounterAndAl, newRow]); break;
      case "OtherItemDigBank": setOtherItemDigBank([...OtherItemDigBank, newRow]); break;
      case "ProjectCap": setProjectCap([...ProjectCap, newRow]); break;
    }
  };

  const handleDeleteRow = (type: string, id: string) => {
    const updatedData = (data: DataRow[]) => data.filter((row) => row.id !== id);

    switch (type) {
      case "OfficeFurniture": setOfficeFurniture(updatedData(OfficeFurniture)); break;
      case "OfficeEquipment": setOfficeEquipment(updatedData(OfficeEquipment)); break;
      case "ITHardware": setITHardware(updatedData(ITHardware)); break;
      case "OtherITItems": setOtherITItems(updatedData(OtherITItems)); break;
      case "SecurityItems": setSecurityItems(updatedData(SecurityItems)); break;
      case "Vechile": setVechile(updatedData(Vechile)); break;
      case "CounterAndAl": setCounterAndAl(updatedData(CounterAndAl)); break;
      case "OtherItemDigBank": setOtherItemDigBank(updatedData(OtherItemDigBank)); break;
      case "ProjectCap": setProjectCap(updatedData(ProjectCap)); break;
    }
  };

  const formatData = (dataset: DataRow[]): FormData[] => {
    return dataset.map(row => ({
      item: row.item,
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

  const handleSubmit = async (type: string) => {
    const dataset = type === "OfficeFurniture" ? OfficeFurniture :
      type === "OfficeEquipment" ? OfficeEquipment :
      type === "ITHardware" ? ITHardware :
      type === "OtherITItems" ? OtherITItems :
      type === "SecurityItems" ? SecurityItems :
      type === "Vechile" ? Vechile :
      type === "CounterAndAl" ? CounterAndAl :
      type === "OtherItemDigBank" ? OtherItemDigBank :
      ProjectCap;

    const formattedData = formatData(dataset);
    try {
      await sendDataBackend(formattedData);
      alert("Data submitted successfully");
    } catch (error) {
      console.error("Failed to submit data", error);
      alert("Failed to submit data");
    }
  };

  const renderTable = (type: string, data: DataRow[]) => (
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
      {renderTable("OfficeFurniture", OfficeFurniture)}
      {renderTable("OfficeEquipment", OfficeEquipment)}
      {renderTable("ITHardware", ITHardware)}
      {renderTable("OtherITItems", OtherITItems)}
      {renderTable("SecurityItems", SecurityItems)}
      {renderTable("Vechile", Vechile)}
      {renderTable("CounterAndAl", CounterAndAl)}
      {renderTable("OtherItemDigBank", OtherItemDigBank)}
      {renderTable("ProjectCap", ProjectCap)}
    </div>
  );
};

export default CapitalItem;