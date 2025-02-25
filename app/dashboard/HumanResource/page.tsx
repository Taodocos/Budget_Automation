"use client";

import { useState, useEffect } from "react";
import { fetchDataBackend } from "@/app/service/apiFetchHumanR"; 
import { saveData } from "@/app/service/apiUpdateRepo"; 
import { fetchBranches } from "@/app/service/apiFetchBranch"; 
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const AllowGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    const [editParentCode, setEditParentCode] = useState<number | null>(null);
    const [gridData, setGridData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const rowsPerPage = 7; 

    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        const storedDistrictRight = sessionStorage.getItem("district_code");
        const storedUserId = sessionStorage.getItem("userId");
        setBranchCode(storedBranchCode);
        setDistrictRight(storedDistrictRight);
        setUserId(storedUserId); 
    }, []);

    useEffect(() => {
        const fetchBranchData = async () => {
            if (districtRight) {
                const branchData = await fetchBranches(branchCode || "", districtRight);
                setBranches(branchData);
            }
        };
        fetchBranchData();
    }, [districtRight, branchCode]);

    useEffect(() => {
        if (branchCode) {
            fetchDataBackend(branchCode)
                .then(data => {
                    console.log("Fetched Data:", data); // Log fetched data
                    if (data && data.length > 0) {
                        setGridData(data); // Set the grid data if it exists
                    } else {
                        console.log("No data returned for the given branch code.");
                        setGridData([]); // Clear the grid data if no valid data is returned
                    }
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                });
        }
    }, [branchCode]);

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchCode = event.target.value;
        setBranchCode(selectedBranchCode);
        setCurrentPage(0); // Reset to the first page when changing the branch

        if (selectedBranchCode) {
            fetchDataBackend(selectedBranchCode)
                .then(data => {
                    console.log("Fetched Data after branch change:", data);
                    if (data && data.length > 0) {
                        setGridData(data);
                    } else {
                        console.log("No data returned for the selected branch.");
                        setGridData([]); // Clear if no data
                    }
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                });
        } else {
            setGridData([]); // Clear grid data if no branch is selected
        }
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        setGridData((prevData) =>
            prevData.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            )
        );
    };

    const handleEdit = (index: number) => {
        setEditParentCode(index);
    };

    const handleSave = async (index: number) => {
        const rowToSave = gridData[index];
        if (rowToSave) {
            try {
                await saveData(rowToSave); 
                alert("Changes saved successfully!"); 
            } catch (error) {
                console.error('Error saving changes:', error);
            }
        }
        setEditParentCode(null); 
    };

    const filteredData = gridData.filter(row =>
        row.allowanceDesc.toLowerCase().includes(searchQuery.toLowerCase())
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

    return (
        <div className="p-6 bg-gray-100 overflow-hidden">
            <select
                value={branchCode || ""}
                onChange={handleBranchChange}
                className="mb-4 p-2 border rounded text-black"
            >
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                    <option key={branch.branch_code} value={branch.branch_code}>
                        {branch.branch_name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 p-2 border rounded text-black font-bold"
            />
           
            <div className="bg-white shadow-md rounded p-4">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                           {/* <th className="border p-2">Psition</th>  */}
                            <th className="border p-2">Allowance Desc</th>
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
                        {currentRows.map((row, index) => (
                            <tr key={`${row.allowanceDesc}-${index}`} className="text-sm text-gray-700">
                                {/* <td className="border p-2">{row.DeptDesc}</td>  */}
                                <td className="border p-2">{row.allowanceDesc}</td>
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

export default AllowGrid;