"use client";

import { useState, useEffect } from "react";
import apiServices from "@/app/ExportApi";
import { fetchManBy } from "@/app/service/apifetchAllByDis";


// Define the structure for grid data
interface GridData {
    id: string;
    district: string;     // District or department
    description: string;  // Description of the item
    estimated: string;    // Estimated value
    actual: string;       // Actual value
    projected: string;    // Projected value
    jul: string;          // Values for each month
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
    branch_code: string;
    fiscalYear: string;
    totalAmount: string;
}

const StrDiGrid = () => {
    const [gridData, setGridData] = useState<GridData[]>([]);
    const [ManPoweData, setManPoweData] = useState<ManPowerData[]>([]);
    const [AllowanceData, setAllowanceData] = useState<AllowanceData[]>([]);
    const [ExpenditureGridData, setExpenditureGridData] = useState<ExpenditureData[]>([]);
    const [ExpencesData, setExpencesData] = useState<ExpenseData[]>([]);
    const [searchQuery] = useState<string>("");
 





    useEffect(() => {
        const fetchData = async () => {
            try {
                const manpowerData = await fetchManBy();
                console.log("Fetched Data for Main Table:", manpowerData);
                setGridData(manpowerData as GridData[]);
                await ExpenditureGridDataData();
                await fetchManPowerData();
                await fetchAllowanceData();
                await fetchExpenseData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(); // Call fetchData
    }, []); 

    const ExpenditureGridDataData = async () => {
        try {
     

            const response = await apiServices.get('/getexpenditurebydistrict'); // Change to POST
            const data = response.data; // Assuming response.data contains the data you need
            console.log("Fetched expenditure Data:", data);
            setExpenditureGridData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };


  

    const fetchManPowerData = async () => {
        try {
            
            const response = await apiServices.get('/getManpowerBydistrict'); // Change to POST
            const data = response.data; // Assuming response.data contains the data you need
            console.log("Fetched Additional Data:", data);
            setManPoweData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };

    const fetchAllowanceData = async () => {
        try {
           
            const response = await apiServices.get('/allowancesbydistrict'); // Change to POST
            const data = response.data; // Assuming response.data contains the data you need
            console.log("Fetched Additional Data:", data);
            setAllowanceData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };

    const fetchExpenseData = async () => {
        try {
            
            const response = await apiServices.get('/getexpensebydistrict'); // Change to POST
            const data = response.data; // Assuming response.data contains the data you need
            console.log("Fetched Additional Data:", data);
            setExpencesData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching additional grid data:", error);
        }
    };

    // const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedBranchCode = event.target.value;
    //     setBranchCode(selectedBranchCode);
    //     setCurrentPage(0);
    // };

 
    const filteredData = gridData.filter(row =>
        row.description && row.description.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="h-screen overflow-y-auto p-6 bg-gray-100"> {/* Updated here */}
           
           
            <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                <h2 className="font-bold text-black">Operational Suplay and Income</h2>
                <div className="max-h-60 overflow-y-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">District/Dept.</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Estimated</th>
                                <th className="border p-2">Actual</th>
                                {/* <th className="border p-2">Net Increment</th> */}
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
               <td className="border p-2">{row.district}</td>
                <td className="border p-2">{row.description}</td>
                <td className="border p-2">{row.estimated}</td>
                <td className="border p-2">{row.actual}</td>
                {/* <td className="border p-2">{row.netincrement}</td> */}
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

export default StrDiGrid;