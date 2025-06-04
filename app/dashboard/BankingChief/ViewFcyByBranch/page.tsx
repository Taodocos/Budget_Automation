"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import apiServices from "@/app/ExportApi";
import { fetchBranches } from "@/app/service/apiFetchAllBranches";

interface GridData {
    actual: string;
    estimated: string; 
    projected: string;
    netIncrement: string;
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
    description: string;
    district: string; // Include this if needed
}

const FcyByBrGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ deptCode: string; deptDesc: string }[]>([]);
    const [gridData, setGridData] = useState<GridData[]>([]); 
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const rowsPerPage = 7;

    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        setBranchCode(storedBranchCode);
    }, []);

    // Fetch branches for the dropdown
    useEffect(() => {
        const fetchBranchData = async () => {
            try {
                const response = await fetchBranches(); 
                if (response.statusCode === 200 && Array.isArray(response.data)) {
                    setBranches(response.data); 
                } else {
                    console.error("Invalid response format:", response);
                    setBranches([]); 
                }
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };
        fetchBranchData();
    }, []);

    // Fetch grid data based on the selected branch
    useEffect(() => {
        const fetchGridData = async () => {
            if (branchCode) {
                try {
                    const response = await apiServices.get(`/FCYbybranch?branch_code=${branchCode}`);
                    if (response.data) {
                        setGridData(response.data);
                    } else {
                        console.log("No data returned for the selected branch.");
                        setGridData([]);
                    }
                } catch (error) {
                    console.error("Error fetching grid data:", error);
                }
            }
        };
        fetchGridData();
    }, [branchCode]);

    const filteredData = gridData.filter(row =>
        row.description && row.description.toLowerCase().includes(searchQuery.toLowerCase())
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

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBranchCode(event.target.value);
        setCurrentPage(0); // Reset to the first page
    };

    return (
        <div className="h-screen overflow-y-auto p-6 bg-gray-100">
            <select
                value={branchCode || ""}
                onChange={handleBranchChange}
                className="mb-4 p-2 border rounded text-black"
            >
                <option value="">Select a Branch</option>
                {branches.map((branch) => (
                    <option key={branch.deptCode} value={branch.deptCode}>
                        {branch.deptDesc}
                    </option>
                ))}
            </select>
            <h1 className="mb-4 p-2 border rounded text-black font-bold">FCY</h1>
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
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Actual</th>
                            <th className="border p-2">Estimated</th>
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index} className="text-sm text-gray-700">
                                <td className="border p-2">{row.description}</td>
                                <td className="border p-2">{row.actual}</td>
                                <td className="border p-2">{row.estimated}</td>
                                <td className="border p-2">{row.netIncrement}</td>
                                <td className="border p-2">{row.projected}</td>
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

export default FcyByBrGrid;