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
    | 'StationaryStok' 
    | 'BankFormatAndPrinting' 
    | 'UniformStok' 
    | 'CheckBoxStok'
    | 'CpoStok'
    | 'OtherSupliyStok'
    | 'StampStok'
    | 'ATMCardAndPinMailer'
    | 'RevenuStamp';

// Define the ids object with the specific type
const ids: Record<IdType, string> = {
  StationaryStok: "11",
  BankFormatAndPrinting: "12",
  UniformStok: "13",
  CheckBoxStok: "14",
  CpoStok: "15",
  OtherSupliyStok: "16",
  StampStok: "17",
  ATMCardAndPinMailer: "18",
  RevenuStamp: "19",
};

const SuplyItem = () => {
  const router = useRouter();
  const [branchCode, setBranchCode] = useState<string | null>(null);
  const [StationaryStok, setStationaryStok] = useState<DataRow[]>([]);
  const [BankFormatAndPrinting, setBankFormatAndPrinting] = useState<DataRow[]>([]);
  const [UniformStok, setUniformStok] = useState<DataRow[]>([]);
  const [CheckBoxStok, setCheckBoxStok] = useState<DataRow[]>([]);
  const [CpoStok, setCpoStok] = useState<DataRow[]>([]);;
  const [OtherSupliyStok, setOtherSupliyStok] = useState<DataRow[]>([]);
  const [StampStok, setStampStok] = useState<DataRow[]>([]);
  const [ATMCardAndPinMailer, setATMCardAndPinMailer] = useState<DataRow[]>([]);
  const [RevenuStamp, setRevenuStamp] = useState<DataRow[]>([]);
  
  const [StationaryStokSources, setStationaryStokSources] = useState<SourceItem[]>([]);
  const [BankFormatAndPrintingSources, setBankFormatAndPrintingSources] = useState<SourceItem[]>([]);
  const [UniformStokSources, setUniformStokSources] = useState<SourceItem[]>([]);
  const [CheckBoxStokSources, setCheckBoxStokSources] = useState<SourceItem[]>([]);
  const [CpoStokSources, setCpoStokSources] = useState<SourceItem[]>([]);
  const [OtherSupliyStokSources, setOtherSupliyStokSources] = useState<SourceItem[]>([]);
  const [StampStokSources, setStampStokSources] = useState<SourceItem[]>([]);
  const [ATMCardAndPinMailerSources, setATMCardAndPinMailerSources] = useState<SourceItem[]>([]);
  const [RevenuStampSources, setRevenuStampSources] = useState<SourceItem[]>([]);
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
    if (expandedGrids.has("StationaryStok")) {
      setStationaryStokSources(await fetchSources(ids.StationaryStok));
    }
    if (expandedGrids.has("BankFormatAndPrinting")) {
      setBankFormatAndPrintingSources(await fetchSources(ids.BankFormatAndPrinting));
    }
    if (expandedGrids.has("UniformStok")) {
      setUniformStokSources(await fetchSources(ids.UniformStok));
    }
    if (expandedGrids.has("CheckBoxStok")) {
      setCheckBoxStokSources(await fetchSources(ids.CheckBoxStok));
    }
    if (expandedGrids.has("CpoStok")) {
      setCpoStokSources(await fetchSources(ids.CpoStok));
    }
    if (expandedGrids.has("OtherSupliyStok")) {
      setOtherSupliyStokSources(await fetchSources(ids.OtherSupliyStok));
    }
    if (expandedGrids.has("StampStok")) {
      setStampStokSources(await fetchSources(ids.StampStok));
    }
    if (expandedGrids.has("ATMCardAndPinMailer")) {
      setATMCardAndPinMailerSources(await fetchSources(ids.ATMCardAndPinMailer));
    }
    if (expandedGrids.has("RevenuStamp")) {
      setRevenuStampSources(await fetchSources(ids.RevenuStamp));
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
    type: IdType,
    id: string,
    field: keyof DataRow,
    value: string
  ) => {
    // Validate numeric fields
    if ((field === "quantity" ) && isNaN(Number(value))) {
      alert("Please enter a valid number.");
      return;
    }

    const updatedData = (type === "StationaryStok" ? StationaryStok :
      type === "BankFormatAndPrinting" ? BankFormatAndPrinting :
      type === "UniformStok" ? UniformStok :
      type === "CheckBoxStok" ? CheckBoxStok :
      type === "CpoStok" ? CpoStok :
      type === "OtherSupliyStok" ? OtherSupliyStok :
      type === "StampStok" ? StampStok :
      type === "ATMCardAndPinMailer" ? ATMCardAndPinMailer :
      
      RevenuStamp).map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );

    switch (type) {
      case "StationaryStok": setStationaryStok(updatedData); break;
      case "BankFormatAndPrinting": setBankFormatAndPrinting(updatedData); break;
      case "UniformStok": setUniformStok(updatedData); break;
      case "CheckBoxStok": setCheckBoxStok(updatedData); break;
      case "CpoStok": setCpoStok(updatedData); break;
      case "OtherSupliyStok": setOtherSupliyStok(updatedData); break;
      case "StampStok": setStampStok(updatedData); break;
      case "ATMCardAndPinMailer": setATMCardAndPinMailer(updatedData); break;
      case "RevenuStamp": setRevenuStamp(updatedData); break;
    }
  };

  const formatData = (dataset: DataRow[], type: IdType): FormData[] => {
    const parent_code = ids[type]; // Get the parent code based on the type
    return dataset.map(row => ({
      item: row.item,
      quantity: row.quantity,
      parent_code: parent_code, // Set parent_code based on the supply type
      branch_code: branchCode, // Include branch code
      quarter: row.quarter,
      New: row.New,
      replacement: row.replacement,
    }));
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
      case "StationaryStok": setStationaryStok([...StationaryStok, newRow]); break;
      case "BankFormatAndPrinting": setBankFormatAndPrinting([...BankFormatAndPrinting, newRow]); break;
      case "UniformStok": setUniformStok([...UniformStok, newRow]); break;
      case "CheckBoxStok": setCheckBoxStok([...CheckBoxStok, newRow]); break;
      case "CpoStok": setCpoStok([...CpoStok, newRow]); break;
      case "OtherSupliyStok": setOtherSupliyStok([...OtherSupliyStok, newRow]); break;
      case "StampStok": setStampStok([...StampStok, newRow]); break;
      case "ATMCardAndPinMailer": setATMCardAndPinMailer([...ATMCardAndPinMailer, newRow]); break;
      case "RevenuStamp": setRevenuStamp([...RevenuStamp, newRow]); break;
    }
  };

  const handleDeleteRow = (type: IdType, id: string) => {
    const updatedData = (type === "StationaryStok" ? StationaryStok :
      type === "BankFormatAndPrinting" ? BankFormatAndPrinting :
      type === "UniformStok" ? UniformStok :
      type === "CheckBoxStok" ? CheckBoxStok :
      type === "CpoStok" ? CpoStok :
      type === "OtherSupliyStok" ? OtherSupliyStok :
      type === "StampStok" ? StampStok :
      type === "ATMCardAndPinMailer" ? ATMCardAndPinMailer :
     
      RevenuStamp).filter((row) => row.id !== id);



    switch (type) {
      case "StationaryStok": setStationaryStok(updatedData); break;
      case "BankFormatAndPrinting": setBankFormatAndPrinting(updatedData); break;
      case "UniformStok": setUniformStok(updatedData); break;
      case "CheckBoxStok": setCheckBoxStok(updatedData); break;
      case "CpoStok": setCpoStok(updatedData); break;
      case "OtherSupliyStok": setOtherSupliyStok(updatedData); break;
      case "StampStok": setStampStok(updatedData); break;
      case "ATMCardAndPinMailer": setATMCardAndPinMailer(updatedData); break;
      case "RevenuStamp": setRevenuStamp(updatedData); break;
    }
  };

  const handleSubmit = async (type: IdType) => {
    const dataset = type === "StationaryStok" ? StationaryStok :
    type === "BankFormatAndPrinting" ? BankFormatAndPrinting :
    type === "UniformStok" ? UniformStok :
    type === "CheckBoxStok" ? CheckBoxStok :
    type === "CpoStok" ? CpoStok :
    type === "OtherSupliyStok" ? OtherSupliyStok :
    type === "StampStok" ? StampStok :
    type === "ATMCardAndPinMailer" ? ATMCardAndPinMailer :
    RevenuStamp;

    const formattedData = formatData(dataset, type); 
    
    try {
      await sendDataBackend(formattedData); // Send the formatted data to the backend
    } catch (error) {
      console.error(`Failed to submit data for ${type}`, error);
    }
  };

  const renderTable = (type: IdType, data: DataRow[], sources: SourceItem[]) => (
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
      {renderTable("StationaryStok", StationaryStok, StationaryStokSources)} 
      {renderTable("BankFormatAndPrinting", BankFormatAndPrinting, BankFormatAndPrintingSources)} 
      {renderTable("UniformStok", UniformStok, UniformStokSources)} 
      {renderTable("CheckBoxStok", CheckBoxStok, CheckBoxStokSources)} 
      {renderTable("CpoStok", CpoStok, CpoStokSources)} 
      {renderTable("OtherSupliyStok", OtherSupliyStok, OtherSupliyStokSources)} 
      {renderTable("StampStok", StampStok, StampStokSources)} 
      {renderTable("ATMCardAndPinMailer", ATMCardAndPinMailer, ATMCardAndPinMailerSources)} 
      {renderTable("RevenuStamp", RevenuStamp, RevenuStampSources)} 
    </div>
  );
};

export default SuplyItem;