"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchSourcesById } from "@/app/service/apiFetchsource";
import apiServices, { sendDataBackend, FormData } from "@/app/service/apiAddCapitalSupply";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { saveData } from "@/app/service/apicapitalRowSave";

// Define the interface for the API response
interface SourceItem {
    description: string;
    parent_code: string;
}

export interface ReportFormData { 
    id: string; 
    quarter: string; 
    branch_code: string;
    deptDesc: string; 
    item_name: string; 
    qty: string; 
    unitPrice: string; 
    totalbudget: string; 
    item_code:string
}
interface DataRow {
    id: string;
    item: string; // This will hold the selected item code from the dropdown
    quantity: string;
    quarter: string;
    New: boolean; // Changed to boolean
    replacement: boolean; // Changed to boolean
}

interface ExpenditureData {
    id: string;
    deptDesc: string; 
    item_name: string; 
    qty: string; 
    unitPrice: string;
    totalbudget: string; 
    quarter: string; 
    
    item_code:string
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
    const [branchCode, setBranchCode] = useState<string>("");
    // State for each category
    const [FurnitureAndFittings, setFurnitureAndFittings] = useState<DataRow[]>([]);
    const [OfficeAndOtherEquipment, setOfficeAndOtherEquipment] = useState<DataRow[]>([]);
    const [ComputerAndRelatedItem, setComputerAndRelatedItem] = useState<DataRow[]>([]);
    const [Vechile, setVechile] = useState<DataRow[]>([]);
    const [Building, setBuilding] = useState<DataRow[]>([]);
    const [ATMAndPos, setATMAndPos] = useState<DataRow[]>([]);
    const [gridData] = useState<ExpenditureData[]>([]);
    const [CaunterAndPartitions, setCaunterAndPartitions] = useState<DataRow[]>([]);
    const [ExpenditureGridData, setExpenditureGridData] = useState<ExpenditureData[]>([]);
    const [sources, setSources] = useState<SourceItem[]>([]);
    const [expandedGrids, setExpandedGrids] = useState<Set<string>>(new Set());
    const [editParentCode, setEditParentCode] = useState<number | null>(null);
    const [searchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const rowsPerPage = 7; 

    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        setBranchCode(storedBranchCode || ""); // Default to empty string if null
    }, []);

    const fetchSources = async (id: string) => {
        try {
            const data = await fetchSourcesById(id);
            if (data && data.length > 0) {
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


    const filteredData = gridData.filter(row =>
        row.qty.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const handleNextPage = () => {
      if (currentPage < totalPages - 1) {
          setCurrentPage(currentPage + 1);
      }
    };
    
    const handlePreviousPage = () => {
      if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
      }
    };
    
    
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
      

    
    const handleInputChange = (index: number, field: keyof ExpenditureData, value: string) => {
        setExpenditureGridData((prevData) =>
            prevData.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            )
        );
      };


    const ExpenditureGridDataData = async (selectedBranchCode: string) => {
        try {
            const payload = { branch_code: selectedBranchCode };
            console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

            const response = await apiServices.post('/getfixedbybranch', payload);
            const data = response.data; // Assuming response.data contains the data you need
            console.log("Fetched expenditure Data:", data);
            setExpenditureGridData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };


    useEffect(() => {
        if (branchCode) {
            console.log("Fetching data for branch code:", branchCode);
            ExpenditureGridDataData(branchCode);
        }
    }, [branchCode]);

    const fetchAllSources = useCallback(async () => {
        const sourcesData = [];
        for (const [key, value] of Object.entries(ids)) {
            if (expandedGrids.has(key)) {
                const fetchedSources = await fetchSources(value);
                sourcesData.push(...fetchedSources);
            }
        }
        setSources(sourcesData);
    }, [expandedGrids]);

    useEffect(() => {
        fetchAllSources();
    }, [fetchAllSources]);

    const toggleGrid = (heading: string) => {
        const newSet = new Set(expandedGrids);
        if (newSet.has(heading)) {
            newSet.delete(heading);
        } else {
            newSet.add(heading);
        }
        setExpandedGrids(newSet);
    };
    const handleInputChangeM = (
        type: IdType,
        id: string,
        field: keyof DataRow,
        value: string | boolean // Change here: specify possible types
    ) => {
        const updateData = (setData: React.Dispatch<React.SetStateAction<DataRow[]>>, data: DataRow[]) => {
            setData(data.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
        };

        switch (type) {
            case "FurnitureAndFittings":
                updateData(setFurnitureAndFittings, FurnitureAndFittings);
                break;
            case "OfficeAndOtherEquipment":
                updateData(setOfficeAndOtherEquipment, OfficeAndOtherEquipment);
                break;
            case "ComputerAndRelatedItem":
                updateData(setComputerAndRelatedItem, ComputerAndRelatedItem);
                break;
            case "Vechile":
                updateData(setVechile, Vechile);
                break;
            case "Building":
                updateData(setBuilding, Building);
                break;
            case "ATMAndPos":
                updateData(setATMAndPos, ATMAndPos);
                break;
            case "CaunterAndPartitions":
                updateData(setCaunterAndPartitions, CaunterAndPartitions);
                break;
        }
    };

    const handleEdit = (index: number) => {
        setEditParentCode(index);
      };
      const handleSave = async (index: number) => {
        const rowToSave = ExpenditureGridData[index];
        if (rowToSave) {
            try {
                if (!branchCode) {
                    alert("Branch code is required.");
                    return;
                }
      

    const dataToSave: ReportFormData = {
        id: rowToSave.id || "",
        qty: rowToSave.qty,
        quarter: rowToSave.quarter,
        unitPrice: rowToSave.unitPrice,
        item_code: rowToSave.item_code,
        totalbudget: rowToSave.totalbudget,
        branch_code: branchCode,
        item_name: rowToSave.item_name || "",
        deptDesc: "",
       
    };

          await saveData(dataToSave);
          
      } catch (error) {
          console.error('Error saving changes:', error);
          alert('Failed to save changes.');
      }
  }
  setEditParentCode(null); // Reset edit state
};


    const handleAddRow = (type: IdType) => {
        const newRow: DataRow = {
            id: (Math.random() * 1000).toString(),
            item: "",
            quantity: "",
            quarter: "",
            New: false,
            replacement: false,
        };

        switch (type) {
            case "FurnitureAndFittings":
                setFurnitureAndFittings([...FurnitureAndFittings, newRow]);
                break;
            case "OfficeAndOtherEquipment":
                setOfficeAndOtherEquipment([...OfficeAndOtherEquipment, newRow]);
                break;
            case "ComputerAndRelatedItem":
                setComputerAndRelatedItem([...ComputerAndRelatedItem, newRow]);
                break;
            case "Vechile":
                setVechile([...Vechile, newRow]);
                break;
            case "Building":
                setBuilding([...Building, newRow]);
                break;
            case "ATMAndPos":
                setATMAndPos([...ATMAndPos, newRow]);
                break;
            case "CaunterAndPartitions":
                setCaunterAndPartitions([...CaunterAndPartitions, newRow]);
                break;
        }
    };

    const handleDeleteRow = (type: IdType, id: string) => {
        const updatedData = (data: DataRow[]) => data.filter((row) => row.id !== id);

        switch (type) {
            case "FurnitureAndFittings":
                setFurnitureAndFittings(updatedData(FurnitureAndFittings));
                break;
            case "OfficeAndOtherEquipment":
                setOfficeAndOtherEquipment(updatedData(OfficeAndOtherEquipment));
                break;
            case "ComputerAndRelatedItem":
                setComputerAndRelatedItem(updatedData(ComputerAndRelatedItem));
                break;
            case "Vechile":
                setVechile(updatedData(Vechile));
                break;
            case "Building":
                setBuilding(updatedData(Building));
                break;
            case "ATMAndPos":
                setATMAndPos(updatedData(ATMAndPos));
                break;
            case "CaunterAndPartitions":
                setCaunterAndPartitions(updatedData(CaunterAndPartitions));
                break;
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
            New: row.New ? "1" : "0", // Convert boolean to string
            replacement: row.replacement ? "1" : "0", // Convert boolean to string
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
            // alert("Data submitted successfully");
        } catch (error) {
            console.error("Failed to submit data", error);
            alert("Failed to submit data");
        }
    };

    const renderTable = (type: IdType, data: DataRow[]) => {
        const isExpanded = expandedGrids.has(type);
        return (
            <div className="bg-white shadow-md rounded p-4 mb-4">
                <h2
                    className="font-bold text-xl mb-2 text-black cursor-pointer"
                    onClick={() => toggleGrid(type)}
                >
                    {isExpanded ? "−" : "+"} {type.replace(/([A-Z])/g, ' $1')}
                </h2>
                {isExpanded && (
                    <div>
                        <div className="flex justify-end items-center mb-2">
                            <button
                                onClick={() => handleAddRow(type)}
                                className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2"
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
                                                    onChange={(e) => handleInputChangeM(type, row.id, "item", e.target.value)}
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
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={row.quantity}
                                                    onChange={(e) => handleInputChangeM(type, row.id, "quantity", e.target.value)}
                                                    className="w-full p-1 border rounded"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <input
                                                    type="text"
                                                    value={row.quarter}
                                                    onChange={(e) => handleInputChangeM(type, row.id, "quarter", e.target.value)}
                                                    className="w-full p-1 border rounded"
                                                />
                                            </td>
                                            <td className="border p-2 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={row.New}
                                                    onChange={(e) => handleInputChangeM(type, row.id, "New", e.target.checked)}
                                                />
                                            </td>
                                            <td className="border p-2 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={row.replacement}
                                                    onChange={(e) => handleInputChangeM(type, row.id, "replacement", e.target.checked)}
                                                />
                                            </td>
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
                                className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-6 bg-gray-100 h-screen overflow-y-auto">
            {renderTable("FurnitureAndFittings", FurnitureAndFittings)}
            {renderTable("OfficeAndOtherEquipment", OfficeAndOtherEquipment)}
            {renderTable("ComputerAndRelatedItem", ComputerAndRelatedItem)}
            {renderTable("Vechile", Vechile)}
            {renderTable("Building", Building)}
            {renderTable("ATMAndPos", ATMAndPos)}
            {renderTable("CaunterAndPartitions", CaunterAndPartitions)}
           
                <h2 className="font-bold text-black">Capital Item</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                                <th className="border p-2">Item</th>
                                <th className="border p-2">Quantity</th>
                                <th className="border p-2">Quarter</th>
                                <th className="border p-2">Unit Price</th>
                                <th className="border p-2">Total Budget</th>
                                <th className="border p-2">Action</th>
                            </tr>
                            </thead>
       <tbody>
       {ExpenditureGridData.map((row,index) => (
               <tr key={row.id} className="text-sm text-gray-700">
                   <td className="border p-2">{row.item_name}</td>
                   <td className="border p-2">
                   {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.qty}
                               onChange={(e) => handleInputChange(index, "qty", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.qty
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.quarter}
                               onChange={(e) => handleInputChange(index, "quarter", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.quarter
                       )}
                   </td>
                 
                   <td className="border p-2">{row.unitPrice}</td>
                   <td className="border p-2">{row.totalbudget}</td>
                   <td className="border p-2">
    {editParentCode === index ? (
        <button
            onClick={() => handleSave(index)}
            className="bg-green-500 text-white p-1 rounded"
        >
            Save
        </button>
    ) : (
        <button
            onClick={() => handleEdit(index)}
            className="bg-blue-500 text-white p-1 rounded mr-2"
        >
            Edit
        </button>
    )}
</td>



                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                    <button 
                        onClick={handlePreviousPage} 
                        disabled={currentPage === 0}
                        className="bg-[#025AA2] text-[#fedc61] p-2 rounded flex items-center"
                    >
                        <ChevronLeftIcon className="h-5 w-5 mr-2" />
                        Previous
                    </button>
                    <button 
                        onClick={handleNextPage} 
                        disabled={currentPage >= totalPages - 1}
                        className="bg-[#025AA2] text-[#fedc61] p-2 rounded flex items-center"
                    >
                        <ChevronRightIcon className="h-5 w-5 mr-2" />
                        Next
                    </button>
                </div>

                </div>
            </div>
      
    );
};

export default CapitalItem;