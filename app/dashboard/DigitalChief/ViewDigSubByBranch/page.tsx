"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
// Fetch branches
import apiServices from "@/app/ExportApi";
import { fetchBranches } from "@/app/service/apiFetchAllBranches";

interface GridData {
    itemCode: string;
    parentCode: string;
    item: string;
    quantity: string; // Assuming these values are strings
    unitPrice: string;
    totalBudget: string;
    quarter: string;
    new: string; // Assuming these values are strings
    replacement: string; // Assuming these values are strings
}


const FcyByBrGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    // const [districtRight, setDistrictRight] = useState<string | null>(null);
    // const [userId, setUserId] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    const [gridData, setGridData] = useState<GridData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const rowsPerPage = 7;

    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        // const storedDistrictRight = sessionStorage.getItem("district_code");
        // const storedUserId = sessionStorage.getItem("userId");
        setBranchCode(storedBranchCode);
        // setDistrictRight(storedDistrictRight);
        // setUserId(storedUserId); 
    }, []);

  
    // Fetch branches for the dropdown
    useEffect(() => {
        const fetchBranchData = async () => {
            try {
                const data = await fetchBranches(); // Fetch branches
                setBranches(data); // Populate the dropdown
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
                console.log("Fetching data for branch code:", branchCode);
                try {
                    const response = await apiServices.get(`/getDataByBranchCode/${branchCode}`);
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
        row.item && row.item.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <option key={branch.branch_code} value={branch.branch_code}>
                        {branch.branch_name}
                    </option>
                ))}
            </select>
            <h1 className="mb-4 p-2 border rounded text-black font-bold">Capital Expenditure</h1>
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
                            <th className="border p-2">District</th>
                            <th className="border p-2">Item</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Unit Price</th>
                            <th className="border p-2">Total Budget</th>
                            <th className="border p-2">Quarter</th>
                            <th className="border p-2">New</th>
                            <th className="border p-2">Replacement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={`${row.itemCode}-${index}`} className="text-sm text-gray-700">
                                <td className="border p-2">{row.parentCode}</td>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
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

export default  FcyByBrGrid;