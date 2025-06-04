"use client";

import { useState, useEffect } from "react";

//import { saveData } from "@/app/service/apiUpdateRepo"; 
import { fetchBranches } from "@/app/service/apiFetchBranch"; 
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

// import apiServices from "@/app/ExportApi";
interface GridData {

    id: string;
    estimated: string; 
    deptDesc:string;
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

const AllowGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    //const [editParentCode, setEditParentCode] = useState<number | null>(null);
    const [gridData] = useState<GridData[]>([]); 

    // const [ManPoweData, setManPoweData] = useState<any[]>([]);
    // const [AllowanceData, setAllowanceData] = useState<any[]>([]);
    // const [ExpenditureGridData, setExpenditureGridData] = useState<any[]>([]);
    // const [ExpencesData, setExpencesData] = useState<any[]>([]);
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
console.log("",userId)

//     const [isHr, setIsHr] = useState<boolean>(false);
//     const [isCoo, setIsCoo] = useState<boolean>(false);
//     const [isDis, setIsDis] = useState<boolean>(false);
//     const [isBus, setIsBus] = useState<boolean>(false);
//     const [isBan, setIsBan] = useState<boolean>(false);
//     const [isDig, setIsDig] = useState<boolean>(false);
//     const [isStr, setIsStr] = useState<boolean>(false);
  
//     useEffect(() => {
//     setIsHr(Number(sessionStorage.getItem("IsHr")) === 1);
//     setIsStr(Number(sessionStorage.getItem("IsStr")) === 1);
//     setIsCoo(Number(sessionStorage.getItem("IsCoo")) === 1);
//     setIsDis(Number(sessionStorage.getItem("IsDis")) === 1);
//     setIsBus(Number(sessionStorage.getItem("IsBus")) === 1);
//     setIsBan(Number(sessionStorage.getItem("IsBan")) === 1);
//     setIsDig(Number(sessionStorage.getItem("IsDig")) === 1);

// }, []);
// console.log("is may her ",isHr)
    useEffect(() => {
        const fetchBranchData = async () => {
            if (districtRight) {
                const branchData = await fetchBranches(branchCode || "", districtRight);
                setBranches(branchData);
            }
        };
        fetchBranchData();
    }, [districtRight, branchCode]);

    // useEffect(() => {
    //     if (branchCode) {
    //         console.log("Fetching data for branch code:", branchCode);
    //         fetchDataBackend(branchCode)
    //             .then(data => {
    //                 console.log("Fetched Data for Main Table:", data);
    //                 setGridData(data); // Ensure you're setting the grid data directly
    //             })
    //             .catch(err => {
    //                 console.error("Error fetching grid data:", err);
    //             });
    //             // fetchAdditionalDataExpenditure(branchCode)
    //             // ExpenditureGridDataData(branchCode);
    //             // fetchManPowerData(branchCode);
    //             // fetchAllowanceData(branchCode);
    //             // fetchExpenseData(branchCode);
    //     }
    // }, [branchCode]);

    // 


    // const ExpenditureGridDataData = async (selectedBranchCode: string) => {
    //     try {
    //         const payload = { branch_code: selectedBranchCode };
    //         console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

    //         const response = await apiServices.post('/getcapitalexpenditure', payload); // Change to POST
    //         const data = response.data; // Assuming response.data contains the data you need
    //         console.log("Fetched expenditure Data:", data);
    //         setExpenditureGridData(data.length > 0 ? data : []);
    //     } catch (error) {
    //         console.error("Error fetching additional grid data:", error);
    //     }
    // };

    // const fetchManPowerData = async (selectedBranchCode: string) => {
    //     try {
    //         const payload = { branch_code: selectedBranchCode };
    //         console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

    //         const response = await apiServices.post('/getManpowerBybranch', payload); // Change to POST
    //         const data = response.data; // Assuming response.data contains the data you need
    //         console.log("Fetched Additional Data:", data);
    //         setManPoweData(data.length > 0 ? data : []);
    //     } catch (error) {
    //         console.error("Error fetching additional grid data:", error);
    //     }
    // };

    // const fetchAllowanceData = async (selectedBranchCode: string) => {
    //     try {
    //         const payload = { branch_code: selectedBranchCode };
    //         console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

    //         const response = await apiServices.post('/allowancesbybranch', payload); // Change to POST
    //         const data = response.data; // Assuming response.data contains the data you need
    //         console.log("Fetched Additional Data:", data);
    //         setAllowanceData(data.length > 0 ? data : []);
    //     } catch (error) {
    //         console.error("Error fetching additional grid data:", error);
    //     }
    // };

    // const fetchExpenseData = async (selectedBranchCode: string) => {
    //     try {
    //         const payload = { branch_code: selectedBranchCode };
    //         console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

    //         const response = await apiServices.post('/expensebybranch', payload); // Change to POST
    //         const data = response.data; // Assuming response.data contains the data you need
    //         console.log("Fetched Additional Data:", data);
    //         setExpencesData(data.length > 0 ? data : []);
    //     } catch (error) {
    //         console.error("Error fetching additional grid data:", error);
    //     }
    // };

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchCode = event.target.value;
        setBranchCode(selectedBranchCode);
        setCurrentPage(0);
    };

    // const handleInputChange = (index: number, field: string, value: string) => {
    //     setGridData((prevData) =>
    //         prevData.map((row, i) =>
    //             i === index ? { ...row, [field]: value } : row
    //         )
    //     );
    // };

    // const handleEdit = (index: number) => {
    //     setEditParentCode(index);
    // };

    // const handleSave = async (index: number) => {
    //     const rowToSave = gridData[index];
    //     if (rowToSave) {
    //         try {
    //             await saveData(rowToSave); 
    //             alert("Changes saved successfully!"); 
    //         } catch (error) {
    //             console.error('Error saving changes:', error);
    //         }
    //     }
    //     setEditParentCode(null); 
    // };
    const filteredData = gridData.filter(row =>
        row.deptDesc && row.deptDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentRows = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
    console.log("Current Rows:", currentRows); // Log this to check


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
        <div className="h-screen overflow-y-auto p-6 bg-gray-100"> {/* Updated here */}
            <select
                value={branchCode || ""}
                onChange={handleBranchChange}
                className="mb-4 p-2 border rounded text-black"
            >
                <option value="">Select a District</option>
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
                <h2 className="font-bold">Main Table</h2>
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
    {currentRows.length === 0 ? (
        <tr>
            <td colSpan={17} className="text-center p-4">No data available for this branch code.</td>
        </tr>
    ) : (
        currentRows.map((row) => (
            <tr key={row.id} className="text-sm text-gray-700"> {/* Use row.id for keys */}
                <td className="border p-2">{row.deptDesc}</td>
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
  {/* <h2 className="font-bold mt-6">Capital Expenditure</h2>
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
                            
                            {ExpenditureGridData.map((row, index) => (
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
                </div> */}

{/* Additional Table 2 */}
{/* <h2 className="font-bold mt-6">Man Power Plan</h2>
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
                            {ManPoweData.map((row, index) => (
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
                </div> */}

                {/* Additional Table 1 */}
                {/* <h2 className="font-bold mt-6">Allowances</h2>
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
                            {AllowanceData.map((row, index) => (
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
                </div> */}

                {/* <h2 className="font-bold mt-6">Allowances</h2>
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
                            {ExpencesData.map((row, index) => (
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
                </div> */}

                

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

export default AllowGrid;