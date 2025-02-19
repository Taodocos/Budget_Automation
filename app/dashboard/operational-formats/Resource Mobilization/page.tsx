"use client";

import { sendDataBackend } from "@/app/service/apiAddResouceMobData";
import { fetchDataBackend } from "@/app/service/apiFetchEditData";
import { useEffect, useState } from "react";
import apiServices from "@/app/ExportApi";
import { saveData } from "@/app/service/apiAddResMobRow";
import { ReportFormData } from "@/app/service/apifetchResMon";



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
    parent_code?: string; // Optional for the initial state
  }
  
  interface FormData {
    actual: string;
    estimated: string;
    netincrement: string;
    projected: string;
    parent_code: string; // For submission
    parent_code_fetch?: string; // For fetching
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
const ResourceMobilization = () => {

   

    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [branchName, setBranchName] = useState<string | null>(null);
    const [region, setRegion] = useState<string | null>(null);
    const [districtcode, setDistrictCode] = useState<string | null>(null);


    
  useEffect(() => {
    
        const storedBranchCode = sessionStorage.getItem("branch_code");
        const storedBranchName= sessionStorage.getItem("branch_name");
        const storedRegion= sessionStorage.getItem("region");
        const storedDistrict= sessionStorage.getItem("district_code");
        setBranchCode(storedBranchCode);
        setBranchName(storedBranchName);
        setRegion(storedRegion);
        setDistrictCode(storedDistrict);
    }, []);
  

   

  const [data, setData] = useState<DataRow[]>([
    {
      id: "18",
      source: "Demand Deposit",
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
    },
    {
      id: "19",
      source: "Saving Deposit",
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
    },
    {
      id: "20",
      source: "Time deposit",
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
    },
  ]);

  const [incomeData, setIncomeData] = useState<DataRow[]>([
    {
      id: "21",
      source: "Amanah/Demand",
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
    },
    {
      id: "22",
      source: "Lubbaik- Wadiah/Saving",
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
    },
    {
      id: "23",
      source: "Mudarabah/Time",
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
    },
  ]);

  const [additionalData, setAdditionalData] = useState<DataRow[]>([
    {
      id: "24",
      source: "Export",
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
    },
    {
      id: "25",
      source: "Money Transfer",
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
    },
    {
      id: "26",
      source: "Incoming Transfer (ITT)",
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
    },
    {
      id: "27",
      source: "Cash Purchase",
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
    },
    {
      id: "28",
      source: "Other sources",
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
    },
  ]);

  const [ShareCapital, setShareCapital] = useState<DataRow[]>([
    {
      id: "29",
      source: "Local Market",
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
    },
    {
      id: "30",
      source: "Foreign Market",
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
    },
  ]);
  const assignParentCodes = () => {
    const parentCodes = {
        data: "8",
        incomeData: "9",
        additionalData: "10",
        shareCapital: "11",
    };

    setData(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.data,
    })));

    setIncomeData(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.incomeData,
    })));

    setAdditionalData(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.additionalData,
    })));

    setShareCapital(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.shareCapital,
    })));
};

useEffect(() => {
    const storedBranchCode = sessionStorage.getItem("branch_code");
    setBranchCode(storedBranchCode);
}, []);




const fetchData = async () => {
    if (!branchCode) return;

    try {
        const sections = [
            { key: "data", code: "8" },
            { key: "incomeData", code: "9" },
            { key: "additionalData", code: "10" },
            { key: "shareCapital", code: "11" },
        ];

        for (const section of sections) {
            console.log("Requesting data for branch_code:", branchCode, "with parent_code:", section.code);
            const response = await apiServices.post('/get_bybranch_parentcode', {
                branch_code: branchCode,
                parent_code: section.code,
            });

            if (response.status === 204) {
                console.warn(`No data found for ${section.key} with branch_code: ${branchCode} and parent_code: ${section.code}`);
                continue; // Skip to the next section
            }

            if (response.status === 200) {
                const fetchedData = response.data.data || [];
                console.log(`Data received for ${section.key}:`, fetchedData);
                
                if (Array.isArray(fetchedData)) {
                    const mappedData = fetchedData.map(item => ({
                        id: item.parentcode,
                        source: item.description,
                        actualMarch: item.actual,
                        estimatedJune: item.estimated,
                        netIncrementPlan: item.netincrement,
                        projectedJune: item.projected,
                        Jul: item.jul,
                        Aug: item.aug,
                        Sep: item.sep,
                        Oct: item.oct,
                        Nov: item.nov,
                        Dec: item.dec,
                        Jan: item.jan,
                        Feb: item.feb,
                        Mar: item.mar,
                        Apr: item.apr,
                        May: item.may,
                        Jun: item.jun,
                    }));

                    if (section.key === "data") setData(mappedData);
                    else if (section.key === "incomeData") setIncomeData(mappedData);
                    else if (section.key === "additionalData") setAdditionalData(mappedData);
                    else if (section.key === "shareCapital") setShareCapital(mappedData);
                }
            } else {
                console.error(`Failed to fetch data for ${section.key}:`, response.status);
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

useEffect(() => {
    fetchData(); 
}, [branchCode]); 
  


  const handleInputChange = (id: string, field: keyof DataRow, value: string, dataset: "data" | "incomeData" | "additionalData" | "ShareCapital") => {
    const setter = dataset === "data" ? setData : dataset === "incomeData" ? setIncomeData : dataset === "additionalData" ? setAdditionalData : setShareCapital;
    const updatedData = (dataset === "data" ? data : dataset === "incomeData" ? incomeData : dataset === "additionalData" ? additionalData : ShareCapital).map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setter(updatedData);
  };

  const formatData = (dataset: DataRow[]): FormData[] => {
    return dataset.map(row => ({
        actual: row.actualMarch,
        estimated: row.estimatedJune,
        netincrement: row.netIncrementPlan,
        projected: row.projectedJune,
        parent_code: row.id.toString(),
        branch_code: branchCode,
        district_code:districtcode,
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
const formatDataForRowSave = (row: DataRow): ReportFormData => ({
    id: row.id, // Ensure this is included
    actual: row.actualMarch,
    estimated: row.estimatedJune,
    netincrement: row.netIncrementPlan,
    projected: row.projectedJune,
    parentcode: row.id, // Correct mapping for parent code
    branch_code: branchCode!, // Ensure branch code is not null
    district_code: districtcode!, // Ensure district code is not null
    jul: row.Jul,
    aug: row.Aug,
    sep: row.Sep,
    oct: row.Oct,
    nov: row.Nov,
    dec: row.Dec,
    jan: row.Jan,
    feb: row.Feb,
    mar: row.Mar,
    apr: row.Apr,
    may: row.May,
    jun: row.Jun,
    status: "",
    description: ""
});

const saveRow = async (row: DataRow) => {
    const formattedRowData = formatDataForRowSave(row);
    try {
        await saveData(formattedRowData); // Call your API to save the row data
       // alert("Row saved successfully");
    } catch (error) {
        console.error("Failed to save row data:", error);
        //alert("Save failed: " + error.message); // Display the error message
    }
};


const renderTextBoxes = () => (
    <div className="mb-4">
        <div className="flex space-x-4 text-black ">
            <div className="flex-1">
                <label htmlFor="branch-name" className="block text-sm font-bold text-black">Branch Name:</label>
                <input
                    type="text"
                    id="branch-name"
                    value={branchName ?? ""} 
                    readOnly
                    className="w-full p-2 border rounded bg-gray-200"
                />
            </div>
            {/* <div className="flex-1">
                <label htmlFor="district" className="block text-sm font-bold text-black">District:</label>
                <input
                    type="text"
                    id="district"
                    value="Your District" 
                    readOnly
                    className="w-full p-2 border rounded bg-gray-200"
                />
            </div> */}
            <div className="flex-1">
                <label htmlFor="region" className="block text-sm font-bold text-black">Region:</label>
                <input
                    type="text"
                    id="region"
                    value={region ?? ""} 
                    readOnly
                    className="w-full p-2 border rounded bg-gray-200"
                />
            </div>
        </div>
    </div>
);

const [expandedGrids, setExpandedGrids] = useState<Set<string>>(new Set());
const toggleGrid = (gridName: string) => {
    const newExpandedGrids = new Set(expandedGrids);
    if (newExpandedGrids.has(gridName)) {
      newExpandedGrids.delete(gridName);
    } else {
      newExpandedGrids.add(gridName);
    }
    setExpandedGrids(newExpandedGrids);
  };

 



const renderTable = (heading: string, dataset: DataRow[], datasetKey: "data" | "incomeData" 
    | "additionalData" | "ShareCapital") => {
    // Calculate totals for numeric fields
    const totals = {
        actualMarch: 0,
        estimatedJune: 0,
        netIncrementPlan: 0,
        projectedJune: 0,
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
    };

    dataset.forEach(row => {
        totals.actualMarch += Number(row.actualMarch) || 0;
        totals.estimatedJune += Number(row.estimatedJune) || 0;
        totals.netIncrementPlan += Number(row.netIncrementPlan) || 0;
        totals.projectedJune += Number(row.projectedJune) || 0;
        totals.Jan += Number(row.Jan) || 0;
        totals.Feb += Number(row.Feb) || 0;
        totals.Mar += Number(row.Mar) || 0;
        totals.Apr += Number(row.Apr) || 0;
        totals.May += Number(row.May) || 0;
        totals.Jun += Number(row.Jun) || 0;
        totals.Jul += Number(row.Jul) || 0;
        totals.Aug += Number(row.Aug) || 0;
        totals.Sep += Number(row.Sep) || 0;
        totals.Oct += Number(row.Oct) || 0;
        totals.Nov += Number(row.Nov) || 0;
        totals.Dec += Number(row.Dec) || 0;
    });

    return (
<div className="mb-8">
        <h2
          className="font-bold text-xl mb-2 text-black cursor-pointer"
          onClick={() => toggleGrid(heading)}
        >
          {expandedGrids.has(heading) ? "−" : "+"} {heading}
        </h2>
        {expandedGrids.has(heading) && (
          <div className="bg-white shadow-md rounded p-4">

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
        <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dataset.map((row) => (
                            <tr key={row.id} className="text-sm text-gray-700">
                                <td className="border p-2">{row.source}</td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={row.actualMarch}
                                        onChange={(e) => handleInputChange(row.id, "actualMarch", e.target.value, datasetKey)}
                                        className="w-full p-1 border rounded"
                                    />
                                </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.estimatedJune}
                                            onChange={(e) => handleInputChange(row.id, "estimatedJune", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.netIncrementPlan}
                                            onChange={(e) => handleInputChange(row.id, "netIncrementPlan", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.projectedJune}
                                            onChange={(e) => handleInputChange(row.id, "projectedJune", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Jul}
                                            onChange={(e) => handleInputChange(row.id, "Jul", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Aug}
                                            onChange={(e) => handleInputChange(row.id, "Aug", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Sep}
                                            onChange={(e) => handleInputChange(row.id, "Sep", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Oct}
                                            onChange={(e) => handleInputChange(row.id, "Oct", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Nov}
                                            onChange={(e) => handleInputChange(row.id, "Nov", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Dec}
                                            onChange={(e) => handleInputChange(row.id, "Dec", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Jan}
                                            onChange={(e) => handleInputChange(row.id, "Jan", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Feb}
                                            onChange={(e) => handleInputChange(row.id, "Feb", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Mar}
                                            onChange={(e) => handleInputChange(row.id, "Mar", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Apr}
                                            onChange={(e) => handleInputChange(row.id, "Apr", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.May}
                                            onChange={(e) => handleInputChange(row.id, "May", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        <input
                                            type="text"
                                            value={row.Jun}
                                            onChange={(e) => handleInputChange(row.id, "Jun", e.target.value, datasetKey)}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>

                                    <td className="border p-2">
    <button
        onClick={() => saveRow(row)} // Call the saveRow function with the current row
        className="bg-blue-500 text-white p-2 rounded"
    >
        Save
    </button>
</td>



                                </tr>
                                
                            ))}
                            <tr className="font-bold bg-black-200 text-black ">
                                <td className="border p-2">Total</td>
                                <td className="border p-2">{totals.actualMarch}</td>
                                <td className="border p-2">{totals.estimatedJune}</td>
                                <td className="border p-2">{totals.netIncrementPlan}</td>
                                <td className="border p-2">{totals.projectedJune}</td>
                                <td className="border p-2">{totals.Jul}</td>
    <td className="border p-2">{totals.Aug}</td>
    <td className="border p-2">{totals.Sep}</td>
    <td className="border p-2">{totals.Oct}</td>
    <td className="border p-2">{totals.Nov}</td>
    <td className="border p-2">{totals.Dec}</td>
    <td className="border p-2">{totals.Jan}</td>
    <td className="border p-2">{totals.Feb}</td>
    <td className="border p-2">{totals.Mar}</td>
    <td className="border p-2">{totals.Apr}</td>
    <td className="border p-2">{totals.May}</td>
    <td className="border p-2">{totals.Jun}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-4">
                    <button
                        onClick={async () => {
                            const formattedData: FormData[] = formatData(dataset);
                            console.log("Transformed Data to be sent:", formattedData);
                            try {
                                const responseData = await sendDataBackend(formattedData);
                                setData((prevData) => 
                                    prevData.map((row) => 
                                        responseData.find((res) => res.parent_code === row.id) || row
                                    )
                                );
                            } catch (error) {
                                console.error(`Failed to submit data for ${heading}`, error);
                                window.alert(`Failed to submit data for ${heading}`);
                            }
                        }}
                        className="bg-blue-500 text-white p-2 rounded"
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
    <div className="p-6 bg-black-100 h-screen overflow-y-auto">
        {renderTextBoxes()}
        {renderTable("Conventional Deposit", data, "data")}
        {renderTable("Interest Free Banking", incomeData, "incomeData")}
        {renderTable("FCY Sources/USDT", additionalData, "additionalData")}
        {renderTable("Share Capital", ShareCapital, "ShareCapital")}
    </div>
);
};

export default ResourceMobilization;