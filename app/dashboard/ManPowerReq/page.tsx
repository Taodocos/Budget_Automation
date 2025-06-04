"use client";

import { useEffect, useState } from "react";

import apiServices, { FormSubmissionData, sendDataBackend } from "@/app/service/addhumanres";
import { fetchSourcesById } from "@/app/service/apiFetchposition";
import ExpeGrid from "../GetExpense/page";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { saveData } from "@/app/service/apiSaveRowMan";



interface SourceItem {
    jobPosId: string;
    jobPosDesc: string;
}

interface DataRow {
    id: string;
    existingStaff: string; // Keep as string
    additionalStaff: string; // Keep as string 
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
    New: string; // Keep as string for checkbox state
    replacement: string; // Keep as string
    jobPosId:string;
  

    
}


export interface ReportFormData { 
    id: string; 
    jobPosId: string;
    additionalStaff: string; 
    existingStaff: string;  
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
    branch_code: string; 
    New:string;
    replacement:string; 
    jobPosDesc:string;
    deptDesc:string
  }
  

interface ManPowerData {
    id: string;
    deptDesc:string;
    jobPosDesc:string;
    jobPosId:string;
    additionalStaff: string;
    existingStaff: string;
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

const ManPower = () => {
    //const router = useRouter();
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [dataRows, setDataRows] = useState<DataRow[]>([]); 
    const [sources, setSources] = useState<SourceItem[]>([]); 
    const [ManPoweData, setManPoweData] = useState<ManPowerData[]>([]);
    const [editParentCode, setEditParentCode] = useState<number | null>(null);
    const [searchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const rowsPerPage = 7;
    const [gridData] = useState<ManPowerData[]>([]);
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

    const handleInputChange = (index: number, field: keyof ManPowerData, value: string) => {
        setManPoweData((prevData) =>
            prevData.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            )
        );
      };
      const handleEdit = (index: number) => {
        setEditParentCode(index);
      };
      



    const handleInputChangeM = (id: string, field: keyof DataRow, value: string) => {
        setDataRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const handleAddRow = () => {
        const newRow: DataRow = {
            id: (Math.random() * 1000).toString(),
            jobPosId:"0",
            existingStaff: "0",
            additionalStaff: "0",
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



    const filteredData = gridData.filter(row =>
        row.jobPosDesc.toLowerCase().includes(searchQuery.toLowerCase())
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
  

    const handleSave = async (index: number) => {
      const rowToSave = ManPoweData[index];
      if (rowToSave) {
          try {
              if (!branchCode) {
                  alert("Branch code is required.");
                  return;
              }

                      const dataToSave: ReportFormData = {
                          id: rowToSave.id || "", 
                          jobPosId: rowToSave.jobPosId,
                          jobPosDesc: rowToSave.jobPosDesc,
                          additionalStaff: rowToSave.additionalStaff,
                          existingStaff: rowToSave.existingStaff,
                          jul: rowToSave.jul,
                          aug: rowToSave.aug,
                          sep: rowToSave.sep,
                          oct: rowToSave.oct,
                          nov: rowToSave.nov,
                          dec: rowToSave.dec,
                          jan: rowToSave.jan,
                          feb: rowToSave.feb,
                          mar: rowToSave.mar,
                          apr: rowToSave.apr,
                          may: rowToSave.may,
                          jun: rowToSave.jun,
                          branch_code: branchCode,
                          replacement:rowToSave.replacement,
                          New:rowToSave.new,
                          deptDesc:rowToSave.deptDesc
              };
    
              await saveData(dataToSave);
              
          } catch (error) {
              console.error('Error saving changes:', error);
              alert('Failed to save changes.');
          }
      }
      setEditParentCode(null); // Reset edit state
    };
    

    const formatData = (): FormSubmissionData[] => {
        return dataRows.map(row => ({
            JobPosId:row.jobPosId,
            existingStaff: row.existingStaff,
            additionalStaff: row.additionalStaff,
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
                                    value={row.jobPosId}
                                    onChange={(e) => handleInputChangeM(row.id, "jobPosId", e.target.value)}
                                    className="w-full p-1 border rounded"
                                >
                                    <option value="">Select</option>
                                    {sources
                                        .filter(source => source.jobPosId !== row.jobPosId)
                                        .map((source) => (
                                            <option key={source.jobPosId} value={source.jobPosId}>
                                                {source.jobPosDesc}
                                            </option>
                                        ))}
                                </select>
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.existingStaff}
                                    onChange={(e) => handleInputChangeM(row.id, "existingStaff", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.additionalStaff}
                                    onChange={(e) => handleInputChangeM(row.id, "additionalStaff", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.jul}
                                    onChange={(e) => handleInputChangeM(row.id, "jul", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.aug}
                                    onChange={(e) => handleInputChangeM(row.id, "aug", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.sep}
                                    onChange={(e) => handleInputChangeM(row.id, "sep", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.oct}
                                    onChange={(e) => handleInputChangeM(row.id, "oct", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.nov}
                                    onChange={(e) => handleInputChangeM(row.id, "nov", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.dec}
                                    onChange={(e) => handleInputChangeM(row.id, "dec", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.jan}
                                    onChange={(e) => handleInputChangeM(row.id, "jan", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.feb}
                                    onChange={(e) => handleInputChangeM(row.id, "feb", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.mar}
                                    onChange={(e) => handleInputChangeM(row.id, "mar", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.apr}
                                    onChange={(e) => handleInputChangeM(row.id, "apr", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.may}
                                    onChange={(e) => handleInputChangeM(row.id, "may", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    value={row.jun}
                                    onChange={(e) => handleInputChangeM(row.id, "jun", e.target.value)}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="checkbox"
                                    checked={row.New === "1"}
                                    onChange={(e) => handleInputChangeM(row.id, "New", e.target.checked ? "1" : "0")}
                                    className="w-full"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="checkbox"
                                    checked={row.replacement === "1"}
                                    onChange={(e) => handleInputChangeM(row.id, "replacement", e.target.checked ? "1" : "0")}
                                    className="w-full"
                                />
                            </td>
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
        <div className="p-6 bg-gray-100 h-screen overflow-y-auto">
           
          <div>
            {renderTable()}
            <h2 className="font-bold text-black">Man Power Plan</h2>
            <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                        <th className="border p-2">deparment</th>
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
                    {ManPoweData.map((row,index) => (
               <tr key={row.id} className="text-sm text-gray-700">
                                {/* <td className="border p-2">{row.DeptDesc}</td>  */}
                                <td className="border p-2">{row.deptDesc}</td>
                                <td className="border p-2">{row.jobPosDesc}</td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.existingStaff}
                                            onChange={(e) => handleInputChange(index, "existingStaff", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.existingStaff
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.additionalStaff}
                                            onChange={(e) => handleInputChange(index, "additionalStaff", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.additionalStaff
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.jul}
                                            onChange={(e) => handleInputChange(index, "jul", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.jul
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.aug}
                                            onChange={(e) => handleInputChange(index, "aug", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.aug
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.sep}
                                            onChange={(e) => handleInputChange(index, "sep", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.sep
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.oct}
                                            onChange={(e) => handleInputChange(index, "oct", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.oct
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.nov}
                                            onChange={(e) => handleInputChange(index, "nov", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.nov
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.dec}
                                            onChange={(e) => handleInputChange(index, "dec", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.dec
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.jan}
                                            onChange={(e) => handleInputChange(index, "jan", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.jan
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.feb}
                                            onChange={(e) => handleInputChange(index, "feb", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.feb
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.mar}
                                            onChange={(e) => handleInputChange(index, "mar", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.mar
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.apr}
                                            onChange={(e) => handleInputChange(index, "apr", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.apr
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.may}
                                            onChange={(e) => handleInputChange(index, "may", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.may
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.jun}
                                            onChange={(e) => handleInputChange(index, "jun", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.jun
                                    )}
                                </td>

                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.new}
                                            onChange={(e) => handleInputChange(index, "new", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.new
                                    )}
                                </td>

                                <td className="border p-2">
                                    {editParentCode === index ? (
                                        <input
                                            type="text"
                                            value={row.replacement}
                                            onChange={(e) => handleInputChange(index, "replacement", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.replacement
                                    )}
                                </td>

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
          <ExpeGrid/>
          
        </div>
        </div>
        </div>
    );
};

export default ManPower;