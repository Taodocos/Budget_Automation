"use client";

import { useState, useEffect } from "react";
//import useFetchData from "@/app/service/useFetchData"; 
import { fetchDataBackend, ReportFormData } from "@/app/service/apiFetchEditData"; 
import { saveData } from "@/app/service/apiUpdateOpData"; 
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const EditableGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    // const [user_Id, setuserId] = useState<string | null>(null);
    // const { data, loading, error } = useFetchData(branchCode); 
    const [editParentCode, setEditParentCode] = useState<string | null>(null);
    const [gridData, setGridData] = useState<ReportFormData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const rowsPerPage = 7; 
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [isRejected, setIsRejected] = useState<boolean>(false);

    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        const storedDistrictRight = sessionStorage.getItem("district_code");
       // const storedUserid = sessionStorage.getItem("userId");
        setBranchCode(storedBranchCode);
        setDistrictRight(storedDistrictRight);
       // setuserId(storedUserid); 
    }, []);

    useEffect(() => {
        if (branchCode && districtRight) {
            // Determine the status based on checkbox states
            let status: string | undefined; // Use undefined instead of an empty string
            if (isApproved) {
                status = "2"; // Approved
            } else if (isRejected) {
                status = "3"; // Rejected
            }

            // Fetch data based on the determined status
            fetchDataBackend(branchCode, districtRight, status) // Ensure status is passed correctly
                .then(data => {
                    setGridData(data);
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                });
        }
    }, [branchCode, districtRight, isApproved, isRejected]);

    const handleInputChange = (parentCode: string, field: keyof ReportFormData, value: string) => {
        setGridData((prevData) =>
            prevData.map((row) =>
                row.parentcode === parentCode ? { ...row, [field]: value } : row
            )
        );
    };

    const handleEdit = (parentCode: string) => {
        setEditParentCode(parentCode);
    };

    const handleSave = async (parentCode: string) => {
        const rowToSave = gridData.find(row => row.parentcode === parentCode);
        if (rowToSave) {
            try {
                await saveData(rowToSave); 
            } catch (error) {
                console.error('Error saving changes:', error);
            }
        }
        setEditParentCode(null); 
    };

    const filteredData = gridData.filter(row =>
        row.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.estimated.includes(searchQuery) ||
        row.actual.includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentRows = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

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

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <div className="p-6 bg-gray-100 overflow-hidden">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 p-2 border rounded text-black font-bold bg-black-200 text-black"
            />
            <div className="mb-4">
                <label className="mr-4 font-bold bg-black-200 text-black">
                    <input 
                        type="checkbox" 
                        checked={isApproved} 
                        onChange={() => {
                            setIsApproved(!isApproved);
                            if (isRejected) setIsRejected(false); // Ensure only one is checked
                        }} 
                    />
                    Approved
                </label>
                <label className="mr-4 font-bold bg-black-200 text-black">
                    <input 
                        type="checkbox" 
                        checked={isRejected} 
                        onChange={() => {
                            setIsRejected(!isRejected);
                            if (isApproved) setIsApproved(false); // Ensure only one is checked
                        }} 
                    />
                    Rejected
                </label>
            </div>
            <div className="bg-white shadow-md rounded p-4">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Estimated</th>
                            <th className="border p-2">Actual</th>
                            <th className="border p-2">Net Increment</th>
                            <th className="border p-2">Projected</th>
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
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row) => (
                            <tr key={row.parentcode} className="text-sm text-gray-700">
                                <td className="border p-2">{row.description}</td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.estimated}
                                            onChange={(e) => handleInputChange(row.parentcode, "estimated", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.estimated
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.actual}
                                            onChange={(e) => handleInputChange(row.parentcode, "actual", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.actual
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.netincrement}
                                            onChange={(e) => handleInputChange(row.parentcode, "netincrement", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.netincrement
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.projected}
                                            onChange={(e) => handleInputChange(row.parentcode, "projected", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.projected
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.jul} 
                                            onChange={(e) => handleInputChange(row.parentcode, "jul", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.jul
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.aug}
                                            onChange={(e) => handleInputChange(row.parentcode, "aug", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.aug
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.sep}
                                            onChange={(e) => handleInputChange(row.parentcode, "sep", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.sep
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.oct}
                                            onChange={(e) => handleInputChange(row.parentcode, "oct", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.oct
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.nov}
                                            onChange={(e) => handleInputChange(row.parentcode, "nov", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.nov
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.dec}
                                            onChange={(e) => handleInputChange(row.parentcode, "dec", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.dec
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.jan}
                                            onChange={(e) => handleInputChange(row.parentcode, "jan", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.jan
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.feb}
                                            onChange={(e) => handleInputChange(row.parentcode, "feb", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.feb
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.mar}
                                            onChange={(e) => handleInputChange(row.parentcode, "mar", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.mar
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.apr}
                                            onChange={(e) => handleInputChange(row.parentcode, "apr", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.apr
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.may}
                                            onChange={(e) => handleInputChange(row.parentcode, "may", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.may
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <input
                                            type="text"
                                            value={row.jun}
                                            onChange={(e) => handleInputChange(row.parentcode, "jun", e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        row.jun
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editParentCode === row.parentcode ? (
                                        <button
                                            onClick={() => handleSave(row.parentcode)}
                                            className="bg-green-500 text-white p-1 rounded"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(row.parentcode)}
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

export default EditableGrid;