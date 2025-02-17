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
  item: string;
  quantity: string;
  unitPrice: string;
  totalBudget: string;
  quarter: string;
  new: string;
  replacement: string;
}

const CapitalItem = () => {
  const router = useRouter();
  const [branchCode, setBranchCode] = useState<string | null>(null);
  const [OfficeFurniture, setOfficeFurniture] = useState<DataRow[]>([]);
  const [OfficeEquipment, setOfficeEquipment] = useState<DataRow[]>([]);
  const [ITHardware, setITHardware] = useState<DataRow[]>([]);
  const [OtherITItems, setOtherITItems] = useState<DataRow[]>([]);
  const [SecurityItems, setSecurityItems] = useState<DataRow[]>([]);
  const [Vechile, setVechile] = useState<DataRow[]>([]);
  const [CounterAndAl, setCounterAndAl] = useState<DataRow[]>([]);
  const [OtherItemDigBank, setOtherItemDigBank] = useState<DataRow[]>([]);
  const [ProjectCap, setProjectCap] = useState<DataRow[]>([]);

  const [OfficeFurnitureSources, setOfficeFurnitureSources] = useState<SourceItem[]>([]);
  const [OfficeEquipmentSources, setOfficeEquipmentSources]= useState<SourceItem[]>([]);
  const [ITHardwareSources, setITHardwareSources] = useState<SourceItem[]>([]);
  const [OtherITItemsSources, setOtherITItemsSources] = useState<SourceItem[]>([]);
  const [SecurityItemsSources, setSecurityItemsSources]  = useState<SourceItem[]>([]);
  const [VechileSources, setVechileSources] = useState<SourceItem[]>([]);
  const [CounterAndAlSources, setCounterAndAlSources]= useState<SourceItem[]>([]);
  const [OtherItemDigBankSources, setOtherItemDigBankSources]  = useState<SourceItem[]>([]);
  const [ProjectCapSources, setProjectCapSources]= useState<SourceItem[]>([]);

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
    if (expandedGrids.has("OfficeFurniture")) {
      setOfficeFurniture(await fetchSources("86"));
    }
    if (expandedGrids.has("OfficeEquipment")) {
      setOfficeEquipment(await fetchSources("87"));
    }
    if (expandedGrids.has("ITHardware")) {
      setITHardware(await fetchSources("88"));
    }
    if (expandedGrids.has("OtherITItems")) {
      setOtherITItems(await fetchSources("773"));
    }
    if (expandedGrids.has("SecurityItems")) {
      setSecurityItems(await fetchSources("774"));
    }
    if (expandedGrids.has("Vechile")) {
      setVechile(await fetchSources("774"));
    }
    if (expandedGrids.has("CounterAndAl")) {
      setCounterAndAl(await fetchSources("774"));
    }
    if (expandedGrids.has("OtherItemDigBank")) {
      setOtherItemDigBank(await fetchSources("774"));
    }
    if (expandedGrids.has("ProjectCap")) {
      setProjectCap(await fetchSources("774"));
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
    const updatedData = (type === "OfficeFurniture" ? OfficeFurniture :
      type === "OfficeEquipment" ? OfficeEquipment :
      type === "ITHardware" ? ITHardware :
      type === "OtherITItems" ? OtherITItems :
      type === "SecurityItems" ? SecurityItems :
      type === "Vechile" ? Vechile :
      type === "CounterAndAl" ? CounterAndAl :
      type === "OtherItemDigBank" ? OtherItemDigBank :
      ProjectCap).map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );

    switch (type) {
      case "OfficeFurniture": setOfficeFurniture(updatedData); break;
      case "OfficeEquipment": setOfficeEquipment(updatedData); break;
      case "ITHardware": setITHardware(updatedData); break;
      case "OtherITItems": setOtherITItems(updatedData); break;
      case "SecurityItems": setSecurityItems(updatedData); break;
      case "Vechile": setVechile(updatedData); break;
      case "CounterAndAl": setCounterAndAl(updatedData); break;
      case "OtherItemDigBank": setOtherItemDigBank(updatedData); break;
      case "ProjectCap": setProjectCap(updatedData); break;
    }
  };

  const formatData = (dataset: DataRow[]): FormData[] => {
    return dataset.map(row => ({
      quantity: row.quantity,
      unitPrice: row.unitPrice,
      totalBudget: row.totalBudget,
      parent_code: row.item,
      quarter: row.quarter,
      new: row.new,
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
      new: "",
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
    const updatedData = (type === "OfficeFurniture" ? OfficeFurniture :
      type === "OfficeEquipment" ? OfficeEquipment :
      type === "ITHardware" ? ITHardware :
      type === "OtherITItems" ? OtherITItems :
      type === "SecurityItems" ? SecurityItems :
      type === "Vechile" ? Vechile :
      type === "CounterAndAl" ? CounterAndAl :
      type === "OtherItemDigBank" ? OtherItemDigBank :
      ProjectCap).filter((row) => row.id !== id);

    switch (type) {
      case "OfficeFurniture": setOfficeFurniture(updatedData); break;
      case "OfficeEquipment": setOfficeEquipment(updatedData); break;
      case "ITHardware": setITHardware(updatedData); break;
      case "OtherITItems": setOtherITItems(updatedData); break;
      case "SecurityItems": setSecurityItems(updatedData); break;
      case "Vechile": setVechile(updatedData); break;
      case "CounterAndAl": setCounterAndAl(updatedData); break;
      case "OtherItemDigBank": setOtherItemDigBank(updatedData); break;
      case "ProjectCap": setProjectCap(updatedData); break;
    }
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
                        onChange={(e) =>
                          handleInputChange(type, row.id, "item", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      >
                        <option value="">Select</option>
                        {sources.map((item) => (
                          <option key={item.parent_code} value={item.parent_code}>
                            {item.description}
                          </option>
                        ))}
                      </select>
                    </td>
                    {Object.keys(row)
                      .filter((field) => field !== "id" && field !== "item")
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
      {renderTable("OfficeFurniture", OfficeFurniture, OfficeFurnitureSources)} 
      {renderTable("OfficeEquipment", OfficeEquipment, OfficeEquipmentSources)} 
      {renderTable("ITHardware", ITHardware, ITHardwareSources)} 
      {renderTable("OtherITItems", OtherITItems, OtherITItemsSources)} 
      {renderTable("SecurityItems", SecurityItems, SecurityItemsSources)} 
      {renderTable("Vechile", Vechile, VechileSources)} 
      {renderTable("CounterAndAl", CounterAndAl, CounterAndAlSources)} 
      {renderTable("Other Items for Digital Banking", OtherItemDigBank, OtherItemDigBankSources)} 
      {renderTable("ProjectCap", ProjectCap, ProjectCapSources)} 
    </div>
  );
};

export default CapitalItem;