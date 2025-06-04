"use client";

import { useState, useEffect } from "react";
import apiServices from "@/app/ExportApi";

// Define interfaces for your data, with all properties as strings
interface GridRow {
    id:string;
    expenseId: string;
    position: string;
    existingStaff: string;
    additionalStaff: string;
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
    New: string;
    replacement: string;
}

interface AllowanceRow {
    expenseId: string;
    allowanceDesc: string;
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
    expenseId: string;
    expensesdesc: string;
    deptDesc: string;
    fiscalYear: string;
    totalAmount: string;
}

const HRGrid = () => {
    const [gridData, setGridData] = useState<GridRow[]>([]);
    const [allowanceGridData, setAllowanceGridData] = useState<AllowanceRow[]>([]);
    const [expenseData, setExpenseData] = useState<ExpenseRow[]>([]);
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [textareaValue, setTextareaValue] = useState<string>("");
    const [approveBy, setApproveBy] = useState<string | null>(null);

    
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(event.target.value);
    };


    const [isHr, setIsHr] = useState<boolean>(false);
    const [isCoo, setIsCoo] = useState<boolean>(false);
    const [isDis, setIsDis] = useState<boolean>(false);
    const [isBus, setIsBus] = useState<boolean>(false);
    const [isBan, setIsBan] = useState<boolean>(false);
    const [isDig, setIsDig] = useState<boolean>(false);
    const [isStr, setIsStr] = useState<boolean>(false);
  
    useEffect(() => {
    setIsHr(Number(sessionStorage.getItem("IsHr")) === 1);
    setIsStr(Number(sessionStorage.getItem("IsStr")) === 1);
    setIsCoo(Number(sessionStorage.getItem("IsCoo")) === 1);
    setIsDis(Number(sessionStorage.getItem("IsDis")) === 1);
    setIsBus(Number(sessionStorage.getItem("IsBus")) === 1);
    setIsBan(Number(sessionStorage.getItem("IsBan")) === 1);
    setIsDig(Number(sessionStorage.getItem("IsDig")) === 1);

    if (isDis) {
        setApproveBy("1"); 
    } else if (isHr) {
        setApproveBy("2"); 
    } else if (isCoo) {
        setApproveBy("3"); 
    } else if (isBus) {
        setApproveBy("4"); 
    } else if (isBan) {
        setApproveBy("5"); 
    } else if (isDig) {
        setApproveBy("6"); 
    } else if (isStr) {
        setApproveBy("7"); 
    } else {
        setApproveBy(null); 
    }



}, [isHr, isCoo, isDis, isBus, isBan, isDig, isStr]);




    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        const storedDistrictRight = sessionStorage.getItem("district_code");
        const storedUserId = sessionStorage.getItem("userId");
        setBranchCode(storedBranchCode);
        setDistrictRight(storedDistrictRight);
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetchGridData(); // Fetch grid data
            await fetchAllowanceGridData();
            await fetchExpenseData();
        };

        fetchData();
    }, []);

    const fetchGridData = async () => {
        try {
            const response = await apiServices.get('/getGridData'); // Adjust the endpoint as needed
            const data: GridRow[] = response.data || [];
            console.log("Fetched Grid Data:", data);
            setGridData(data); // Set the grid data
        } catch (error) {
            console.error("Error fetching grid data:", error);
        }
    };

    const fetchAllowanceGridData = async () => {
        try {
            const response = await apiServices.get('/getAllowancedistrict');
            const data: AllowanceRow[] = response.data || [];
            console.log("Fetched Allowance Data:", data);
            setAllowanceGridData(data);
        } catch (error) {
            console.error("Error fetching allowance data:", error);
        }
    };

    const fetchExpenseData = async () => {
        try {
            const response = await apiServices.get('/getexpensebydistrict');
            const data: ExpenseRow[] = response.data || [];
            console.log("Fetched Expense Data:", data);
            setExpenseData(data);
        } catch (error) {
            console.error("Error fetching expense data:", error);
        }
    };

    const handleApprove = async () => {
        if (branchCode && districtRight && userId) {
            const payload = { 
                district_code: branchCode, 
                //district_code: districtRight, 
                UserId: userId, 
                bywhom: approveBy ,
                status:"1",
                reason:textareaValue,

            };
            console.log("Payload to be sent on approve:", JSON.stringify(payload, null, 2)); 
            try {
               const response= await apiServices.post('/approvereject', payload);
                alert(response.data);
            } catch (error) {
                console.error("Error approving:", error);
            }
        } else {
            alert("Branch code or district code is missing.");
        }
    };
    
    const handleReject = async () => {
        if (branchCode && districtRight) {
            const payload = { 
                branch_code: branchCode, 
               // district_code: districtRight, 
                bywhom: approveBy ,
                status:"2",
                reason:textareaValue,
            };
            console.log("Payload to be sent on reject:", JSON.stringify(payload, null, 2)); 
            try {
                await apiServices.post('/approvereject', payload);
                alert("Rejected successfully!");
            } catch (error) {
                console.error("Error rejecting:", error);
            }
        } else {
            alert("Branch code or district code is missing.");
        }
    };


    // Use searchQuery to filter the grid data
    const filteredData = gridData.filter(row =>
        row.position && row.position.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                {/* <h2 className="font-bold">Man Power Plan</h2> */}

                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Position"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <h2 className="font-bold text-black">Man Power Plan</h2>
                <div className="bg-white shadow-md rounded p-4 overflow-x-auto">

                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                                <th className="border p-2">Position</th>
                                <th className="border p-2">Existing Staff</th>
                                <th className="border p-2">Additional Staff</th>
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
                                        <td className="border p-2">{row.position}</td>
                                        <td className="border p-2">{row.existingStaff}</td>
                                        <td className="border p-2">{row.additionalStaff}</td>
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
                                        <td className="border p-2">{row.New}</td>
                                        <td className="border p-2">{row.replacement}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Allowances Table */}
                <h2 className="font-bold text-black">Allowances</h2>
                <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                                <th className="border p-2">Allowance Desc</th>
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
                            {allowanceGridData.map((row, index) => (
                                <tr key={`${row.expenseId}-${index}`} className="text-sm text-gray-700">
                                    <td className="border p-2">{row.allowanceDesc}</td>
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
                <h2 className="font-bold text-black">Expenses</h2>
                <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                                <th className="border p-2">Expense Description</th>
                                <th className="border p-2">Department Description</th>
                                <th className="border p-2">Fiscal Year</th>
                                <th className="border p-2">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseData.map((row, index) => (
                                <tr key={`${row.expenseId}-${index}`} className="text-sm text-gray-700">
                                    <td className="border p-2">{row.expensesdesc}</td>
                                    <td className="border p-2">{row.deptDesc}</td>
                                    <td className="border p-2">{row.fiscalYear}</td>
                                    <td className="border p-2">{row.totalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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


                <div className="mt-4">
                <h2 className="font-bold text-black">Comments</h2>
                <textarea
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    className="w-full h-32 p-2 border rounded font-bold text-black"
                    placeholder="Add your comments here..."
                />
            </div>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={handleApprove}
                        className="bg-green-500 text-white p-1 rounded mr-4 transition duration-200 ease-in-out hover:bg-green-700"
                    >
                        Approve
                    </button>
                    <button
                        onClick={handleReject}
                        className="bg-red-500 text-white p-1 rounded transition duration-200 ease-in-out hover:bg-red-700"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HRGrid;