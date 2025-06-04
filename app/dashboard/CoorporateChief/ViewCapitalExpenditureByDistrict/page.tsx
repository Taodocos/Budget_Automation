"use client";

import { useState, useEffect } from "react";
import { fetchSourcesById } from "@/app/service/apiFetchCapitalExpenditureByDistrict";


interface ExpenditureData {
    itemCode: string;
    deptDesc: string;
    subGroup: string;
    qty: string; // Updated to string
    price: string; // Updated to string
    totalbudget: string; // Updated to string
 
}

const ExpenditureByDiGrid = () => {
    // const [districtRight, setDistrictRight] = useState<string | null>(null);
    // const [userId, setUserId] = useState<string | null>(null);
    // const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    const [gridData, setGridData] = useState<ExpenditureData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
   

    useEffect(() => {
        // const storedDistrictRight = sessionStorage.getItem("district_code");
        // const storedUserId = sessionStorage.getItem("userId");
        // setDistrictRight(storedDistrictRight);
        // setUserId(storedUserId);
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
        row.deptDesc && row.deptDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );

   
    return (
        <div className="p-6 bg-gray-100 overflow-hidden">
               <h1  className="mb-4 p-2 border rounded text-black font-bold">Capital Expenditure</h1>
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
                        <th className="border p-2">Group</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>

              
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, index) => (
                            <tr key={`${row.itemCode}-${index}`} className="text-sm text-gray-700">
                                <td className="border p-2">{row.deptDesc}</td>
                                <td className="border p-2">{row.subGroup}</td>
                                <td className="border p-2">{row.qty}</td>
                                <td className="border p-2">{row.price}</td>
                                <td className="border p-2">{row.totalbudget}</td>
                            
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                   
                </div>
            </div>
        </div>
    );
};

export default ExpenditureByDiGrid;