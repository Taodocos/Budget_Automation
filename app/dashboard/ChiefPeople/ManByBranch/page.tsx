"use client";

import { useState, useEffect } from "react";
import apiServices from "@/app/ExportApi";
import { fetchDataBackend } from "@/app/service/fetchManPower";
import { fetchBranches } from "@/app/service/apiFetchAllBranches";

// Define interfaces for your data
interface GridRow {
    id: string; // Add id property
  deptDesc: string;
  additionalStaff: string;
  existingStaff: string;
  branch_code: string;
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
}

interface AllowanceRow {
    id: string; // Adjust type as necessary
    allowanceDesc: string;
    deptDesc: string;
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
}

interface ExpenseRow {
    id: string; // Adjust type as necessary
    expensesdesc: string;
    branch_code: string;
    fiscalYear: string;
    totalAmount: string;
}

const ManByBrGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    // const [districtRight, setDistrictRight] = useState<string | null>(null);
    // const [userId, setUserId] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ deptCode: string; deptDesc: string }[]>([]);
    const [gridData, setGridData] = useState<GridRow[]>([]);
    const [allowanceData, setAllowanceData] = useState<AllowanceRow[]>([]);
    const [expensesData, setExpensesData] = useState<ExpenseRow[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
 

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
                const response = await fetchBranches(); // Fetch branches
                if (response && response.data) {
                    setBranches(response.data); // Set branches from the response
                } else {
                    console.error("No branches found");
                }
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };
        fetchBranchData();
    }, []);

    // Fetch data based on selected branch code
    useEffect(() => {
        if (branchCode) {
            console.log("Fetching data for branch code:", branchCode);
            fetchDataBackend(branchCode)
                .then(data => {
                    console.log("Fetched Data for Main Table:", data);
                    setGridData(data);
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                });

            // Fetch additional data
            fetchAllowanceData(branchCode);
            fetchExpenseData(branchCode);
        }
    }, [branchCode]);

    const fetchAllowanceData = async (selectedBranchCode: string) => {
        try {
            const payload = { branch_code: selectedBranchCode };
            console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

            const response = await apiServices.post('/allowancesbybranch', payload);
            const data = response.data;
            console.log("Fetched Allowance Data:", data);
            setAllowanceData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching allowance data:", error);
        }
    };

    const fetchExpenseData = async (selectedBranchCode: string) => {
        try {
            const payload = { branch_code: selectedBranchCode };
            console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

            const response = await apiServices.post('/expensebybranch', payload);
            const data = response.data;
            console.log("Fetched Expense Data:", data);
            setExpensesData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching expense data:", error);
        }
    };

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchCode = event.target.value;
        setBranchCode(selectedBranchCode);
      
    };

    const filteredData = gridData.filter(row =>
        row.deptDesc && row.deptDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );

   
    return (
        <div className="h-screen overflow-y-auto p-6 bg-gray-100">
            <select
                value={branchCode || ""}
                onChange={handleBranchChange}
                className="mb-4 p-2 border rounded text-black"
            >
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                    <option key={branch.deptCode} value={branch.deptCode}>
                        {branch.deptDesc}
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
           
            <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                <h2 className="font-bold">Main Table</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                                <th className="border p-2">Department</th>
                                <th className="border p-2">Additional Staff</th>
                                <th className="border p-2">Existing Staff</th>
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
                        {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={17} className="text-center p-4">No data available for this branch code.</td>
                                </tr>
                            ) : (
                                filteredData.map((row) => (
                                    <tr key={row.id} className="text-sm text-gray-700">
                                        <td className="border p-2">{row.deptDesc}</td>
                                        <td className="border p-2">{row.additionalStaff}</td>
                                        <td className="border p-2">{row.existingStaff}</td>
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Allowances Table */}
                <h2 className="font-bold mt-6">Allowances</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                             <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">Allowance Description</th>
                            <th className="border p-2">Department</th>
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
                            {allowanceData.map((row) => (
                                <tr key={row.id} className="text-sm text-gray-700">
                                    <td className="border p-2">{row.allowanceDesc}</td>
                                    <td className="border p-2">{row.deptDesc}</td>
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
                </div>

                {/* Expenses Table */}
                <h2 className="font-bold mt-6">Expenses</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                             <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">Expense Description</th>
                            <th className="border p-2">Branch</th>
                            <th className="border p-2">Fiscal Year</th>
                            <th className="border p-2">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expensesData.map((row) => (
                                <tr key={row.id} className="text-sm text-gray-700">
                                    <td className="border p-2">{row.expensesdesc}</td>
                                    <td className="border p-2">{row.branch_code}</td>
                                    <td className="border p-2">{row.fiscalYear}</td>
                                    <td className="border p-2">{row.totalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between mt-4">
                  
                </div>
            </div>
        </div>
    );
};

export default ManByBrGrid;