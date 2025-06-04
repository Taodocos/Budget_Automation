"use client";

import { useState, useEffect } from "react";
import apiServices from "@/app/ExportApi";
import { fetchBranches } from "@/app/service/apiFetchAllBranches";

interface GridRow {
    itemCode: string;       
    deptDesc: string;     
    item_name: string;         
    qty: string;      
    unitPrice: string;      
    totalbudget: string;    
    quarter: string;       
    new: string;           
    replacement: string;   
}

const CapByBrGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ deptCode: string; deptDesc: string }[]>([]);
    const [gridData, setGridData] = useState<GridRow[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        setBranchCode(storedBranchCode);
    }, []);

    // Fetch branches for the dropdown
    useEffect(() => {
        const fetchBranchData = async () => {
            try {
                const response = await fetchBranches(); // Fetch branches
                console.log("Fetched dropdown data:", response ); // Log the fetched data
                if (response && response.statusCode === 200 && Array.isArray(response.data)) {
                    setBranches(response.data); // Populate the dropdown
                } else {
                    console.error("Fetched data is not valid:", response);
                    setBranches([]); // Set to empty array if data is not valid
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
                console.log("Fetching data for branch code:", branchCode);
                try {
                    const response = await apiServices.get(`/getItemsByBranch`, { params: { branch_code: branchCode } });
                    console.log("API Response:", response); // Log the entire response structure
    
                    // Check for 204 No Content status
                    if (response.status === 204) {
                        console.warn("No content found for the selected branch code.");
                        alert("No content found for the selected branch code.");
                        setGridData([]); // Set to empty array if no content
                        return;
                    }
    
                    // Check if response.data is an array
                    if (Array.isArray(response.data)) {
                        setGridData(response.data); // Directly set if it's already an array
                    } else if (response.data && Array.isArray(response.data.data)) {
                        setGridData(response.data.data); // Use the nested data array
                    } else {
                        console.error("Fetched data is not an array:", response.data);
                        setGridData([]); // Set to empty array if data is not valid
                    }
                } catch (error) {
                    console.error("Error fetching grid data:", error);
                }
            }
        };
        fetchGridData();
    }, [branchCode]);

    const filteredData = gridData.filter(row =>
        row.item_name && row.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBranchCode(event.target.value);
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
                            <th className="border p-2">Item</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Unit Price</th>
                            <th className="border p-2">Total Budget</th>
                            <th className="border p-2">Quarter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row) => (
                            <tr key={row.itemCode} className="text-sm text-gray-700">
                                <td className="border p-2">{row.item_name}</td>
                                <td className="border p-2">{row.qty}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalbudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CapByBrGrid;