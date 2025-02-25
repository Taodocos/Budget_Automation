"use client";

import { useState, useEffect } from "react";

import { fetchDataBackend } from "@/app/service/apiFetchAggTot";
import { fetchSourcesById } from "@/app/service/apiFetchAllBranches";

const CapGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
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

      
    useEffect(() => {
        if (branchCode) {
            fetchDataBackend(branchCode)
                .then(data => {
                    console.log("Fetched Data:", data); // Log fetched data
                    setGridData(data || []); // Set the grid data if it exists, otherwise set to empty
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                    setGridData([]); // Clear the grid data on error
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
                    setGridData(data || []); // Set or clear data based on the response
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                    setGridData([]); // Clear if no data
                });
        } else {
            setGridData([]); // Clear grid data if no branch is selected
        }
    };

    const filteredData = gridData.filter(row => {
        // Check if allowanceDesc exists in the row and filter based on the searchQuery
        return row.allowanceDesc && row.allowanceDesc.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentRows = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    return (
        <div className="p-6 bg-gray-100 overflow-hidden">
            <h1  className="mb-4 p-2 border rounded text-black font-bold">Capital and Suply Expenditure</h1>
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
                            <tr key={`${row.branch_code}-${index}`} className="text-sm text-gray-700">
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
            </div>
        </div>
    );
};

export default CapGrid;