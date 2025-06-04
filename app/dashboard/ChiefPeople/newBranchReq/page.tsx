"use client";

import { useEffect, useState } from "react";

import apiServices, { FormSubmissionData, sendDataBackend } from "@/app/service/addhumanres";
//import ExpenseTemplate from "../Income&Expenses/ExpenseTemplates/page";
import { fetchSourcesById } from "@/app/service/apiFetchposition";


interface SourceItem {
    jobPosId: string;
    jobPosDesc: string;
}

interface DataRow {
    id: string;
    JobPosId: string;
    existingStaff: string; 
    additionalStaff: string; 
    Nofbranch:string;
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
    New: string; 
    replacement: string; 
}


interface ManPowerData {
    id: string;
    deptDesc: string;
    additionalStaff: string;
    existingStaff: string;
    Nofbranch:string;
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
    new: string;
    replacement: string;
}

const NewManPower = () => {
    //const router = useRouter();
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [dataRows, setDataRows] = useState<DataRow[]>([]); 
 const [sources, setSources] = useState<SourceItem[]>([]); 
   const [ManPoweData, setManPoweData] = useState<ManPowerData[]>([]);
    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        setBranchCode(storedBranchCode);
    }, []);

    const fetchManPowerData = async (selectedBranchCode: string) => {
        try {
            const payload = { branch_code: selectedBranchCode };
            console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

            const response = await apiServices.post('/getManpowerBybranch', payload); // Change to POST
            const data = response.data; // Assuming response.data contains the data you need
            console.log("Fetched Additional Data:", data);
            setManPoweData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };

    useEffect(() => {
        if (branchCode) {
          console.log("Fetching data for branch code:", branchCode);
          fetchManPowerData(branchCode);
        }
      }, [branchCode]);
      


    const fetchSources = async () => {
        try {
            const data = await fetchSourcesById();
            if (data && data.length > 0) {
                setSources(data); 
            } else {
                console.warn("No sources found for ID:");
            }
        } catch (error) {
            console.error("Error fetching sources:", error);
        }
    };

    useEffect(() => {
        fetchSources(); 
    }, []);

    const handleInputChange = (id: string, field: keyof DataRow, value: string) => {
        setDataRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const handleAddRow = () => {
        const newRow: DataRow = {
            id: (Math.random() * 1000).toString(),
            JobPosId: "0",
            existingStaff: "0",
            additionalStaff: "0",
            Nofbranch:"0",
            jul: "0",
            aug: "0",
            sep: "0",
            oct: "0",
            nov: "0",
            dec: "0",
            jan: "0",
            feb: "0",
            mar: "0",
            apr: "0",
            may: "0",
            jun: "0",
            New: "0", // Default to "0" for checkbox
            replacement: "0" // Default to "0"
        };
        setDataRows((prev) => [...prev, newRow]);
    };

    const handleDeleteRow = (id: string) => {
        const updatedData = dataRows.filter((row) => row.id !== id);
        setDataRows(updatedData);
    };

    const formatData = (): FormSubmissionData[] => {
        return dataRows.map(row => ({
            JobPosId: row.JobPosId, 
            existingStaff: row.existingStaff,
            additionalStaff: row.additionalStaff,
            Nofbranch:row.Nofbranch,
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
            New: row.New, 
            replacement: row.replacement,
        }));
    };

    const handleSubmit = async () => {
        const formattedData: FormSubmissionData[] = formatData();

        try {
            await sendDataBackend(formattedData);
            // alert("Data submitted successfully!");
        } catch (error) {
            console.error("Failed to submit data", error);
            alert("Failed to submit data");
        }
    };

    const renderTable = () => (
        <div className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="font-bold text-xl mb-2 text-black">Manpower Data</h2>
            <div className="flex justify-end items-center mb-2">
                <button
                    onClick={handleAddRow}
                    className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow"
                >
                    + Add Row
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                            <th className="border p-2">Position</th>
                            <th className="border p-2">Existing Staff</th>
                            <th className="border p-2">Additional Staff</th>
                            <th className="border p-2">Number of Branch</th>
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
                                        value={row.JobPosId}
                                        onChange={(e) => handleInputChange(row.id, "JobPosId", e.target.value)}
                                        className="w-full p-1 border rounded"
                                    >
                                        <option value="">Select</option>
                                        {sources.map((source) => (
                                            <option key={source.jobPosId} value={source.jobPosId}>
                                                {source.jobPosDesc}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                {Object.keys(row)
                                    .filter((field) => field !== "id" && field !== "JobPosId") // Ensure we're only mapping intended fields
                                    .map((field) => (
                                        <td key={field} className="border p-2">
                                            {field === "New" ? (
                                                <input
                                                    type="checkbox"
                                                    checked={row.New === "1"} // Check if the checkbox should be checked
                                                    onChange={(e) =>
                                                        handleInputChange(row.id, field as keyof DataRow, e.target.checked ? "1" : "0")
                                                    }
                                                    className="w-full"
                                                />
                                            ) : field === "replacement" ? (
                                                <input
                                                    type="checkbox"
                                                    checked={row.replacement === "1"} // Check if the checkbox should be checked
                                                    onChange={(e) =>
                                                        handleInputChange(row.id, field as keyof DataRow, e.target.checked ? "1" : "0")
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={row[field as keyof DataRow]}
                                                    onChange={(e) =>
                                                        handleInputChange(row.id, field as keyof DataRow, e.target.value)
                                                    }
                                                    className="w-full p-1 border rounded"
                                                />
                                            )}
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
            <div className="mt-4">
                <button
                    onClick={handleSubmit}
                    className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow"
                >
                    Submit 
                </button>
            </div>
        </div>
    );

   
                      



    return (

    <div>

   
        <div className="p-6 bg-gray-100 h-screen overflow-y-auto">
           
          
            {renderTable()}
          
          
        </div>


        <div>

<h2 className="font-bold text-black">Man Power Plan</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">Department</th>
                            <th className="border p-2">Additional Staff</th>
                            <th className="border p-2">Existing staff</th>
                            <th className="border p-2">Number of Branch</th>
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
                           
                            </tr>
                        </thead>
                        <tbody>
                            {ManPoweData.map((row) => (
                                <tr key={row.id} className="text-sm text-gray-700">
                                    <td className="border p-2">{row.deptDesc}</td>
                                    <td className="border p-2">{row.additionalStaff}</td>
                                    <td className="border p-2">{row.existingStaff}</td>
                                    <td className="border p-2">{row.Nofbranch}</td>
                                    <td className="border p-2">{row.jul}</td>
                                    <td className="border p-2">{row.aug}</td>
                                    <td className="border p-2">{row.sep}</td>
                                    <td className="border p-2">{row.oct}</td>
                                    <td className="border p-2">{row.nov}</td>
                                    <td className="border p-2">{row.dec}</td>
                                    <td className="border p-2">{row.jan}</td>
                                    <td className="border p-2">{row.feb}</td>
                                    <td className="border p-2">{row.mar}</td>
                                    <td className="border p-2">{row.apr}</td>
                                    <td className="border p-2">{row.may}</td>
                                    <td className="border p-2">{row.jun}</td>
                                    <td className="border p-2">{row.new}</td>
                                    <td className="border p-2">{row.replacement}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

</div>
        </div>
    );
};

export default NewManPower;