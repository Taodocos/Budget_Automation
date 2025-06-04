"use client";

import { useState, useEffect } from "react";
import { fetchBranches } from "@/app/service/apiFetchBranch"; 
import { fetchDataBackend } from "@/app/service/apiFetchViewAndApprove";
import apiServices from "@/app/ExportApi";
import ExcelJS from "exceljs";
// Define the structure for grid data
interface GridData {
    id: string;
    description: string;  // Description of the item
    estimated: string;    // Estimated value
    actual: string;       // Actual value
    netincrement: string; // Net increment
    projected: string;    // Projected value
    jul: string;          // Monthly values
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

// Define the structure for expenditure data
interface ExpenditureData {
    id: string;
    deptDesc: string;     // Department description
    item_name: string;    // Name of the item
    qty: string;          // Quantity
    unitPrice: string;    // Unit price
    totalbudget: string;  // Total budget
    quarter: string;      // Quarter of the financial year
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
    deptDesc: string;
    fiscalYear: string;
    totalAmount: string;
}

const DisVGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    // const [userId, setUserId] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    const [gridData, setGridData] = useState<GridData[]>([]);
    const [ManPoweData, setManPoweData] = useState<ManPowerData[]>([]);
    const [AllowanceData, setAllowanceData] = useState<AllowanceData[]>([]);
    const [ExpenditureGridData, setExpenditureGridData] = useState<ExpenditureData[]>([]);
    const [ExpencesData, setExpencesData] = useState<ExpenseData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
  
    // const rowsPerPage = 7;

    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        const storedDistrictRight = sessionStorage.getItem("district_code");
        // const storedUserId = sessionStorage.getItem("userId");
        setBranchCode(storedBranchCode);
        setDistrictRight(storedDistrictRight);
        // setUserId(storedUserId); 
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
            console.log("Fetching data for branch code:", branchCode);
            fetchDataBackend(branchCode)
                .then(data => {
                    console.log("Fetched Data for Main Table:", data);
                    setGridData(data);
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                });
            ExpenditureGridDataData(branchCode);
            fetchManPowerData(branchCode);
            fetchAllowanceData(branchCode);
            fetchExpenseData(branchCode);
        }
    }, [branchCode]);

    const ExpenditureGridDataData = async (selectedBranchCode: string) => {
        try {
            const payload = { branch_code: selectedBranchCode };
            const response = await apiServices.post('/getcapitalexpenditure', payload);
            const data = response.data;
            console.log("Fetched expenditure Data:", data);
            setExpenditureGridData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };

    const fetchManPowerData = async (selectedBranchCode: string) => {
        try {
            const payload = { branch_code: selectedBranchCode };
            const response = await apiServices.post('/getManpowerBybranch', payload);
            const data = response.data;
            console.log("Fetched manpower Data:", data);
            setManPoweData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };

    const fetchAllowanceData = async (selectedBranchCode: string) => {
        try {
            const payload = { branch_code: selectedBranchCode };
            const response = await apiServices.post('/allowancesbybranch', payload);
            const data = response.data;
            console.log("Fetched allowance Data:", data);
            setAllowanceData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };

    const fetchExpenseData = async (selectedBranchCode: string) => {
        try {
            const payload = { branch_code: selectedBranchCode };
            const response = await apiServices.post('/expensebybranch', payload);
            const data = response.data;
            console.log("Fetched expense Data:", data);
            setExpencesData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchCode = event.target.value;
        setBranchCode(selectedBranchCode);
        // setCurrentPage(0);
    };
    const getBranchName = () => {
        const branch = branches.find(b => b.branch_code === branchCode);
        return branch ? branch.branch_name.replace(/\s+/g, '_') : 'Unknown_Branch';
    };

    const exportOperationalData = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Operational Capital');

        sheet.columns = [
            { header: 'Description', key: 'description' },
            { header: 'Estimated', key: 'estimated' },
            { header: 'Actual', key: 'actual' },
            { header: 'Net Increment', key: 'netincrement' },
            { header: 'Projected', key: 'projected' },
            { header: 'Jul', key: 'jul' },
            { header: 'Aug', key: 'aug' },
            { header: 'Sep', key: 'sep' },
            { header: 'Oct', key: 'oct' },
            { header: 'Nov', key: 'nov' },
            { header: 'Dec', key: 'dec' },
            { header: 'Jan', key: 'jan' },
            { header: 'Feb', key: 'feb' },
            { header: 'Mar', key: 'mar' },
            { header: 'Apr', key: 'apr' },
            { header: 'May', key: 'may' },
            { header: 'Jun', key: 'jun' },
        ];
        gridData.forEach(row => sheet.addRow(row));

        const branchName = getBranchName();
        await saveWorkbook(workbook, `${branchName}_Operational_Capital.xlsx`);
    };

    const exportExpenditureData = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Capital Expenditure');

        sheet.columns = [
            { header: 'Department', key: 'deptDesc' },
            { header: 'Item', key: 'item_name' },
            { header: 'Quantity', key: 'qty' },
            { header: 'Unit Price', key: 'unitPrice' },
            { header: 'Total Budget', key: 'totalbudget' },
            { header: 'Quarter', key: 'quarter' },
        ];
        ExpenditureGridData.forEach(row => sheet.addRow(row));

        const branchName = getBranchName();
        await saveWorkbook(workbook, `${branchName}_Capital_Expenditure.xlsx`);
    };

    const exportManpowerData = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Man Power Plan');

        sheet.columns = [
            { header: 'Department', key: 'deptDesc' },
            { header: 'Additional Staff', key: 'additionalStaff' },
            { header: 'Existing Staff', key: 'existingStaff' },
            { header: 'Jul', key: 'jul' },
            { header: 'Aug', key: 'aug' },
            { header: 'Sep', key: 'sep' },
            { header: 'Oct', key: 'oct' },
            { header: 'Nov', key: 'nov' },
            { header: 'Dec', key: 'dec' },
            { header: 'Jan', key: 'jan' },
            { header: 'Feb', key: 'feb' },
            { header: 'Mar', key: 'mar' },
            { header: 'Apr', key: 'apr' },
            { header: 'May', key: 'may' },
            { header: 'Jun', key: 'jun' },
            { header: 'New', key: 'new' },
            { header: 'Replacement', key: 'replacement' },
        ];
        ManPoweData.forEach(row => sheet.addRow(row));

        const branchName = getBranchName();
        await saveWorkbook(workbook, `${branchName}_Man_Power_Plan.xlsx`);
    };

    const exportAllowanceData = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Allowances');

        sheet.columns = [
            { header: 'Allowance Description', key: 'allowanceDesc' },
            { header: 'Department', key: 'deptDesc' },
            { header: 'Jul', key: 'jul' },
            { header: 'Aug', key: 'aug' },
            { header: 'Sep', key: 'sep' },
            { header: 'Oct', key: 'oct' },
            { header: 'Nov', key: 'nov' },
            { header: 'Dec', key: 'dec' },
            { header: 'Jan', key: 'jan' },
            { header: 'Feb', key: 'feb' },
            { header: 'Mar', key: 'mar' },
            { header: 'Apr', key: 'apr' },
            { header: 'May', key: 'may' },
            { header: 'Jun', key: 'jun' },
        ];
        AllowanceData.forEach(row => sheet.addRow(row));

        const branchName = getBranchName();
        await saveWorkbook(workbook, `${branchName}_Allowances.xlsx`);
    };

    const exportExpenseData = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Expenses');

        sheet.columns = [
            { header: 'Expense Description', key: 'expensesdesc' },
            { header: 'Branch', key: 'deptDesc' },
            { header: 'Fiscal Year', key: 'fiscalYear' },
            { header: 'Total Amount', key: 'totalAmount' },
        ];
        ExpencesData.forEach(row => sheet.addRow(row));

        const branchName = getBranchName();
        await saveWorkbook(workbook, `${branchName}_Expenses.xlsx`);
    };

    const saveWorkbook = async (workbook: ExcelJS.Workbook, fileName: string) => {
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const filteredData = gridData.filter(row =>
        row.description && row.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    // const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    // const currentRows = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);


    // const handleNextPage = () => {
    //     if (currentPage < totalPages - 1) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };

    // const handlePreviousPage = () => {
    //     if (currentPage > 0) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    return (
        <div className="h-screen overflow-y-auto p-6 bg-gray-100">
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
           
         



            <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                <h2 className="font-bold text-black">Operational Capital and Supplies</h2>
                <div className="max-h-60 overflow-y-auto">
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
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={17} className="text-center p-4">No data available for this branch code.</td>
                                </tr>
                            ) : (
                                filteredData.map((row) => (
                                    <tr key={row.id} className="text-sm text-gray-700">
                                        <td className="border p-2">{row.description}</td>
                                        <td className="border p-2">{row.actual}</td>
                                        <td className="border p-2">{row.estimated}</td>
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
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <button onClick={exportOperationalData} className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow">
                    Export
                </button>

    
                {/* Additional Tables */}
                <h2 className="font-bold text-black">Capital Expenditure</h2>
                <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                                <th className="border p-2">Department</th>
                                <th className="border p-2">Item</th>
                                <th className="border p-2">Quantity</th>
                                <th className="border p-2">Unit Price</th>
                                <th className="border p-2">Total Budget</th>
                                <th className="border p-2">Quarter</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={exportExpenditureData} className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow">
                    Export
                </button>
                <h2 className="font-bold text-black">Man Power Plan</h2>
                <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
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
                                    <td className="border p-2">{row.new}</td>
                                    <td className="border p-2">{row.replacement}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    
                <button onClick={exportManpowerData} className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow">
                    Export
                </button>

                <h2 className="font-bold text-black">Allowances</h2>
                <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={exportAllowanceData} className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow">
                    Export 
                </button>
                <h2 className="font-bold text-black">Expense</h2>
                <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
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
                            {ExpencesData.map((row) => (
                                <tr key={row.id} className="text-sm text-gray-700">
                                    <td className="border p-2">{row.expensesdesc}</td>
                                    <td className="border p-2">{row.deptDesc}</td>
                                    <td className="border p-2">{row.fiscalYear}</td>
                                    <td className="border p-2">{row.totalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={exportExpenseData} className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow">
                    Export
                </button>

                <div className="flex justify-between mt-4">
                    {/* <button 
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
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default DisVGrid;