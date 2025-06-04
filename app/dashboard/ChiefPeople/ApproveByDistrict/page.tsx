"use client";

import { useState, useEffect } from "react";
import apiServices from "@/app/ExportApi";

import { fetchDistricts } from "@/app/service/apiFetchallDis";
import { fetchDataBackend } from "@/app/service/apifetchManByDistrict";


// Define interfaces for your data
interface GridRow {
    id: string; 
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

interface ExpenseRow {
    id: string; 
    expensesdesc: string;
    branch_code: string;
    fiscalYear: string;
    totalAmount: string;
}

const Manapp = () => {
    const [districtCode, setDistrictCode] = useState<string | null>(null);
    const [districts, setDistricts] = useState<{ districtCode: string; districtName: string }[]>([]);
    const [gridData, setGridData] = useState<GridRow[]>([]);
    const [allowanceData, setAllowanceData] = useState<AllowanceRow[]>([]);
    const [expensesData, setExpensesData] = useState<ExpenseRow[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [textareaValue, setTextareaValue] = useState<string>("");
    const [approveBy, setApproveBy] = useState<string | null>(null);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [branchCode, setBranchCode] = useState<string | null>(null);

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(event.target.value);
    };


    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        const storedDistrictRight = sessionStorage.getItem("district_code");
      const storedUserId = sessionStorage.getItem("userId");
        setBranchCode(storedBranchCode);
        setDistrictRight(storedDistrictRight);
    setUserId(storedUserId); 
    }, []);



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
        setApproveBy("7"); 
    } else if (isHr) {
        setApproveBy("1"); 
    } else if (isCoo) {
        setApproveBy("2"); 
    } else if (isBus) {
        setApproveBy("4"); 
    } else if (isBan) {
        setApproveBy("5"); 
    } else if (isDig) {
        setApproveBy("6"); 
    } else if (isStr) {
        setApproveBy("3"); 
    } else {
        setApproveBy(null); 
    }



}, [isHr, isCoo, isDis, isBus, isBan, isDig, isStr]);



    useEffect(() => {
        // Fetch districts for the dropdown
        const fetchDistrictData = async () => {
            try {
                const response = await fetchDistricts(); 
                
                // Log the entire response to see its structure
                console.log("Fetched dropdown data:", response);

                // Directly set districts if response is an array
                if (Array.isArray(response)) {
                    setDistricts(response); // Set districts directly from the response
                } else {
                    console.error("Expected an array of districts, but got:", response);
                }
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        };
        fetchDistrictData();
    }, []);

    const handleApprove = async () => {
        if (branchCode && districtRight && userId) {
            const payload = { 
                district_code: districtCode, 
                UserId: userId, 
                bywhom: approveBy ,
                status:"1",
                reason:textareaValue,

            };
            console.log("Payload to be sent on approve:", JSON.stringify(payload, null, 2)); 
            try {
                const response= await apiServices.post('/approverejectbydistrict', payload);
            console.log(response);
           alert(response.data.message);
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
                district_code: districtCode, 
                bywhom: approveBy ,
                status:"2",
                reason:textareaValue,
            };
            console.log("Payload to be sent on reject:", JSON.stringify(payload, null, 2)); 
            try {
                const response= await apiServices.post('/approverejectbydistrict', payload);
                alert(response.data.message);
                console.log("API Response Status Code:", response.data); 
            } catch (error) {
                console.error("Error rejecting:", error);
            }
        } else {
            alert("Branch code or district code is missing.");
        }
    };




    useEffect(() => {
        // Fetch data based on selected district code
        if (districtCode) {
            console.log("Fetching data for district code:", districtCode);
            fetchDataBackend(districtCode) // Use district code for fetching data
                .then(data => {
                    console.log("Fetched Data for Main Table:", data);
                    setGridData(data);
                })
                .catch(err => {
                    console.error("Error fetching grid data:", err);
                });

            // Fetch additional data
            fetchAllowanceData(districtCode);
            fetchExpenseData(districtCode);
        }
    }, [districtCode]);

    const fetchAllowanceData = async (selectedDistrictCode: string) => {
        try {
            const payload = { district_code: selectedDistrictCode }; 
            console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

            const response = await apiServices.post('/allowancesbydistrict', payload); 
            const data: AllowanceRow[] = response.data; 
            console.log("Fetched Allowance Data:", data);
            setAllowanceData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching allowance data:", error);
        }
    };

    const fetchExpenseData = async (selectedDistrictCode: string) => {
        try {
            const payload = { district_code: selectedDistrictCode }; 
            console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

            const response = await apiServices.post('/getexpensebydistrict', payload); 
            const data: ExpenseRow[] = response.data; 
            console.log("Fetched Expense Data:", data);
            setExpensesData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching expense data:", error);
        }
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrictCode = event.target.value;
        setDistrictCode(selectedDistrictCode);
    };

    const filteredData = gridData.filter(row =>
        row.deptDesc && row.deptDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-screen overflow-y-auto p-6 bg-gray-100">
           <select
                value={districtCode || ""}
                onChange={handleDistrictChange}
                className="mb-4 p-2 border rounded text-black"
            >
                <option value="">Select a district</option>
                {districts.map((district) => (
                    <option key={district.districtCode} value={district.districtCode}>
                        {district.districtName}
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
                <h2 className="font-bold text-black">Main Table</h2>
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
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={17} className="text-center p-4">No data available for this district code.</td>
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
                <h2 className="font-bold mt-6 text-black">Expenses</h2>
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

export default Manapp;