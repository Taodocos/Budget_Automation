"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { fetchBranches } from "@/app/service/apiFetchBranch"; // Assuming you still want to fetch branches
import { fetchSourcesById } from "@/app/service/apiFetchExpenseByDistrict"; // Updated import for new API

const ExpenseByDiGrid = () => {
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
                            <th className="border p-2">Expense Description</th>
                            <th className="border p-2">Expense Description</th>
                            <th className="border p-2">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={`${row.expenseId}-${index}`} className="text-sm text-gray-700">
                                <td className="border p-2">{row.parentCode}</td>
                                <td className="border p-2">{row.expensesdesc}</td>
                                <td className="border p-2">{row.totalAmount}</td>
                                
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

export default ExpenseByDiGrid;