"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { fetchBranches } from "@/app/service/apiFetchBranch"; // Assuming you still want to fetch branches
import { fetchSourcesById } from "@/app/service/apiFetchExpenseByDistrict"; // Updated import for new API

const ManByDiGrid = () => {
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    const [gridData, setGridData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const rowsPerPage = 7;

    useEffect(() => {
        const storedDistrictRight = sessionStorage.getItem("district_code");
        const storedUserId = sessionStorage.getItem("userId");
        setDistrictRight(storedDistrictRight);
        setUserId(storedUserId);
    }, []);

    // useEffect(() => {
    //     const fetchBranchData = async () => {
    //         const branchData = await fetchBranches(); // Fetch branches if needed
    //         setBranches(branchData);
    //     };
    //     fetchBranchData();
    // }, []);

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const data = await fetchSourcesById(); // Call the new API to fetch data
                console.log("Fetched Data:", data);
                if (data && data.length > 0) {
                    setGridData(data);
                } else {
                    console.log("No data returned.");
                    setGridData([]);
                }
            } catch (err) {
                console.error("Error fetching grid data:", err);
            }
        };
        fetchExpenseData();
    }, []); // Fetch data on component mount

    const filteredData = gridData.filter(row =>
        row.expensesdesc && row.expensesdesc.toLowerCase().includes(searchQuery.toLowerCase())
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
               <h1  className="mb-4 p-2 border rounded text-black font-bold">Expenses</h1>
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
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={`${row.expenseId}-${index}`} className="text-sm text-gray-700">
                                <td className="border p-2">{row.position}</td>  
                                <td className="border p-2">{row.existingStaff}</td>
                                <td className="border p-2">{row.additionalStaff}</td>
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
                                <td className="border p-2">{row.New}</td>
                                <td className="border p-2">{row.replacement}</td>
                                
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

export default ManByDiGrid;