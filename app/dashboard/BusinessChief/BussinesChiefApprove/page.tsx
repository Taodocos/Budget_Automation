"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { fetchBranches } from "@/app/service/apiFetchBranch"; 
import { fetchDataBackend } from "@/app/service/apiFetchViewAndApprove";
import apiServices from "@/app/ExportApi";

interface GridData {
    id: string; // Assuming you have an id field
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



const BussinesGrid = () => {
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    const [gridData, setGridData] = useState<GridData[]>([]); // Use the defined interface
  
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const rowsPerPage = 7; 

    const [isHr, setIsHr] = useState<boolean>(false);
    const [isCoo, setIsCoo] = useState<boolean>(false);
    const [isDis, setIsDis] = useState<boolean>(false);
    const [isBus, setIsBus] = useState<boolean>(false);
    const [isBan, setIsBan] = useState<boolean>(false);
    const [isDig, setIsDig] = useState<boolean>(false);
    const [isStr, setIsStr] = useState<boolean>(false);
  
    useEffect(() => {
        const storedBranchCode = sessionStorage.getItem("branch_code");
        const storedDistrictRight = sessionStorage.getItem("district_code");
        const storedUserId = sessionStorage.getItem("userId");
        setBranchCode(storedBranchCode);
        setDistrictRight(storedDistrictRight);
        setUserId(storedUserId); 
    }, []);

    useEffect(() => {
        setIsHr(Number(sessionStorage.getItem("IsHr")) === 1);
        setIsCoo(Number(sessionStorage.getItem("IsCoo")) === 1);
        setIsDis(Number(sessionStorage.getItem("IsDis")) === 1);
        setIsBus(Number(sessionStorage.getItem("IsBus")) === 1);
        setIsBan(Number(sessionStorage.getItem("IsBan")) === 1);
        setIsDig(Number(sessionStorage.getItem("IsDig")) === 1);
        setIsStr(Number(sessionStorage.getItem("IsStr")) === 1);
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
        }
    }, [branchCode]);

    const determineByWhom = () => {
        if (isHr) return 1;
        if (isDis) return 2;
        if (isCoo) return 3;
        if (isBus) return 4;
        if (isBan) return 5;
        if (isDig) return 6;
        if (isStr) return 7;
        return 0; // Default value if none match
    };

   
    const handleApprove = async () => {
        if (branchCode && districtRight && userId) {
            const byWhom = determineByWhom();
            const payload = { branch_code: branchCode, district_code: districtRight, UserId: userId, byWhom };
            console.log("Payload to be sent on approve:", JSON.stringify(payload, null, 2));
            try {
                await apiServices.post('/approve', payload);
                alert("Approved successfully!");
            } catch (error) {
                console.error("Error approving:", error);
            }
        } else {
            alert("Branch code, district code, or user ID is missing.");
        }
    };
    
    const handleReject = async () => {
        if (branchCode && districtRight) {
            const byWhom = determineByWhom();
            const payload = { branch_code: branchCode, district_code: districtRight, byWhom };
            console.log("Payload to be sent on reject:", JSON.stringify(payload, null, 2));
            try {
                await apiServices.post('/reject', payload);
                alert("Rejected successfully!");
            } catch (error) {
                console.error("Error rejecting:", error);
            }
        } else {
            alert("Branch code or district code is missing.");
        }
    };

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranchCode = event.target.value;
        setBranchCode(selectedBranchCode);
        setCurrentPage(0);
    };

    const filteredData = gridData.filter(row =>
        row.description && row.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentRows = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
    console.log("Current Rows:", currentRows);
    

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
        <div className="h-screen overflow-y-auto p-6 bg-gray-100">
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
                                    <tr key={row.id} className="text-sm text-gray-700">
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

export default BussinesGrid;