
"use client";

import { useState, useEffect } from "react";
import { fetchDataBackend } from "@/app/service/apiFetchViewAndApprove";
import apiServices from "@/app/ExportApi";
import { fetchBranches } from "@/app/service/apiFetchAllBranches";


// Define the structure of a branch
interface Branch {
    deptCode: string;
    deptDesc: string;
}

// Define the structure for grid data
interface GridData {
    id: string;
    description: string;
    estimated: string;
    actual: string;
    netincrement: string;
    projected: string;
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


interface ExpenditureData {
    id: string;
    deptDesc: string;      // Department description
    item_name: string;     // Name of the item
    qty: string;           // Quantity
    unitPrice: string;     // Unit price
    totalbudget: string;   // Total budget
    quarter: string;       
}

// Define the structure for manpower data
interface ManPowerData {
    id: string;
    deptDesc: string;
    additionalStaff: string;
    existingStaff: string;
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
    new: string;
    replacement: string;
}

// Define the structure for allowance data
interface AllowanceData {
    id: string;
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

// Define the structure for expense data
interface ExpenseData {
    id: string;
    expensesdesc: string;
    branch_code: string;
    fiscalYear: string;
    totalAmount: string;
}
const StrBrGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [gridData, setGridData] = useState<GridData[]>([]);
    const [ManPoweData, setManPoweData] = useState<ManPowerData[]>([]);
    const [AllowanceData, setAllowanceData] = useState<AllowanceData[]>([]);
    const [ExpenditureGridData, setExpenditureGridData] = useState<ExpenditureData[]>([]);
    const [ExpencesData, setExpencesData] = useState<ExpenseData[]>([]);   
    const [searchQuery, setSearchQuery] = useState<string>("");
    useEffect(() => {
        const fetchBranchData = async () => {
            console.log("Fetching branch data..."); // Check if this runs
            try {
                const response = await fetchBranches(); // Fetch branches
                console.log("Fetched Branches:", response); // Log the response
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

    useEffect(() => {
        if (branchCode) {
            fetchDataBackend(branchCode)
                .then(data => {
                    setGridData(data);
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                });

            // Fetch additional data
            ExpenditureGridDataData(branchCode);
            fetchManPowerData(branchCode);
            fetchAllowanceData(branchCode);
            fetchExpenseData(branchCode);
        }
    }, [branchCode]);
    const ExpenditureGridDataData = async (selectedBranchCode: string) => {
        try {
            const response = await apiServices.post('/getcapitalexpenditure', { branch_code: selectedBranchCode });
            setExpenditureGridData(response.data || []);
        } catch (error) {
            console.error("Error fetching expenditure data:", error);
        }
    };
    const fetchManPowerData = async (selectedBranchCode: string) => {
        try {
            const response = await apiServices.post('/getManpowerBybranch', { branch_code: selectedBranchCode });
            setManPoweData(response.data || []);
        } catch (error) {
            console.error("Error fetching manpower data:", error);
        }
    };
    const fetchAllowanceData = async (selectedBranchCode: string) => {
        try {
            const response = await apiServices.post('/allowancesbybranch', { branch_code: selectedBranchCode });
            setAllowanceData(response.data || []);
        } catch (error) {
            console.error("Error fetching allowance data:", error);
        }
    };
    const fetchExpenseData = async (selectedBranchCode: string) => {
        try {
            const response = await apiServices.post('/expensebybranch', { branch_code: selectedBranchCode });
            setExpencesData(response.data || []);
        } catch (error) {
            console.error("Error fetching expense data:", error);
        }
    };
    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBranchCode(event.target.value);
       
    };
    const filteredData = gridData.filter(row =>
        row.description && row.description.toLowerCase().includes(searchQuery.toLowerCase())
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
                className="mb-4 p-2 border rounded text-black font-bold"/>
            <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                <h2 className="font-bold text-black">Operational Income ANd Suplly</h2>
                <div className="max-h-60 overflow-y-auto">
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
    {filteredData.length === 0 ? (
        <tr>
            <td colSpan={17} className="text-center p-4">No data available for this branch code.</td>
        </tr>
    ) : (
        filteredData.map((row) => (
            <tr key={row.id} className="text-sm text-gray-700"> {/* Use row.id for keys */}
                <td className="border p-2">{row.description}</td>
                <td className="border p-2">{row.estimated}</td>
                <td className="border p-2">{row.actual}</td>
                <td className="border p-2">{row.netincrement}</td>
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
                <td className="border p-2">
                    <button className="bg-blue-500 text-white p-1 rounded">Edit</button>
                </td>
            </tr>
        ))
    )}
</tbody>
                    </table>
                </div>
  {/* Additional Table 1 */}
  <h2 className="font-bold text-black">Capital Expenditure</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">Department</th>
                    <th className="border p-2">Item</th>
                    <th className="border p-2">quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ExpenditureGridData.map((row) => (
                                <tr key={row.id} className="text-sm text-gray-700">
                                    <td className="border p-2">{row.deptDesc}</td>
                                    <td className="border p-2">{row.item_name}</td>
                                    <td className="border p-2">{row.qty}</td>
                                    <td className="border p-2">{row.unitPrice}</td>
                                    <td className="border p-2">{row.totalbudget}</td>
                                    <td className="border p-2">{row.quarter}</td>
                                    <td className="border p-2">
                                        <button className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
{/* Additional Table 2 */}
<h2 className="font-bold text-black">Man Power Plan</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">Department</th>
                            <th className="border p-2">Additional Staff</th>
                            <th className="border p-2">Existing staff</th>
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
                            <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ManPoweData.map((row) => (
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
                                    <td className="border p-2">{row.may}</td>
                                    <td className="border p-2">{row.jun}</td>
                                    <td className="border p-2">{row.new}</td>
                                    <td className="border p-2">{row.replacement}</td>
                                    <td className="border p-2">
                                   <button className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Additional Table 1 */}
                <h2 className="font-bold text-black">Allowances</h2>
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
                            <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AllowanceData.map((row) => (
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
                                       <td className="border p-2">
                                        <button className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="font-bold text-black">Expenses</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                             <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">Expense Description</th>
                            <th className="border p-2">Branch</th>
                            <th className="border p-2">Fiscal Year</th>
                            <th className="border p-2">Total Amount</th>
                            <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ExpencesData.map((row) => (
                                <tr key={row.id} className="text-sm text-gray-700">
                                    <td className="border p-2">{row.expensesdesc}</td>
                                    <td className="border p-2">{row.branch_code}</td>
                                    <td className="border p-2">{row.fiscalYear}</td>
                                    <td className="border p-2">{row.totalAmount}</td>
                                       <td className="border p-2">
                                        <button className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                    </td>
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

export default StrBrGrid;