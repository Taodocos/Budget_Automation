"use client";

import { useState, useEffect } from "react";
import apiServices from "@/app/ExportApi";

import { fetchDistricts } from "@/app/service/apiFetchallDis";


interface AllowanceRow {
    itemCode: string;       
    deptDesc: string;     
    item_name: string;         
    qty: string;      
    unitPrice: string;      
    totalbudget: string;    
    quarter: string;       
    new: string;           
    replacement: string; 
    subGroup:string;
}



const Manapp = () => {
    const [districtCode, setDistrictCode] = useState<string | null>(null);
    const [districts, setDistricts] = useState<{ districtCode: string; districtName: string }[]>([]);
    const [allowanceData, setAllowanceData] = useState<AllowanceRow[]>([]);
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
    const fetchDistrictData = async () => {
        try {
            const response = await fetchDistricts();
            console.log("Fetched dropdown data:", response);

            // Ensure the response is an array
            if (Array.isArray(response)) {
                // Map through the response to flatten the structure if necessary
                const formattedDistricts = response.map(district => ({
                    districtCode: district.districtCode || district.districtCode?.value, // Adjust based on the actual structure
                    districtName: district.districtName || district.districtName?.value // Adjust based on the actual structure
                })).filter(district => district.districtCode && district.districtName); // Filter out any invalid entries

                setDistricts(formattedDistricts);
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
            console.log(response.data);
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
        if (districtCode) {
           
            fetchAllowanceData(districtCode);
           
        }
    }, [districtCode]);

    const fetchAllowanceData = async (selectedDistrictCode: string) => {
        try {
            const payload = { district_code: selectedDistrictCode }; 
            console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

            const response = await apiServices.post('/getexpenditureBydistrict', payload); 
            const data: AllowanceRow[] = response.data; 
            console.log("Fetched Allowance Data:", data);
            setAllowanceData(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Error fetching allowance data:", error);
        }
    };



    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrictCode = event.target.value;
        setDistrictCode(selectedDistrictCode);
    };

  

    return (
        <div className="h-screen overflow-y-auto p-6 bg-gray-100">
          <select
    value={districtCode || ""}
    onChange={handleDistrictChange}
    className="mb-4 p-2 border rounded text-black"
>
    <option value="">Select a district</option>
    {districts.length > 0 ? (
        districts.map((district) => (
            <option key={district.districtCode} value={district.districtCode}>
                {district.districtName}
            </option>
        ))
    ) : (
        <option disabled>No districts available</option>
    )}
</select>

            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 p-2 border rounded text-black font-bold"
            />
           
            

                {/* Allowances Table */}
                <h2 className="font-bold mt-6">Allowances</h2>
                <div className="max-h-60 overflow-y-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                            <th className="border p-2">Item</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Unit Price</th>
                            <th className="border p-2">Total Budget</th>
                            <th className="border p-2">Quarter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allowanceData.map((row) => (
                             <tr key={row.itemCode} className="text-sm text-gray-700">
                             <td className="border p-2">{row.subGroup || 'N/A'}</td>
                             <td className="border p-2">{row.qty}</td>
                             <td className="border p-2">{row.unitPrice}</td>
                             <td className="border p-2">{row.totalbudget}</td>
                             <td className="border p-2">{row.quarter}</td>
                         </tr>
                        ))}
                    </tbody>
                </table>
                </div>

                {/* Expenses Table */}
               

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
                
        
     
    );
};

export default Manapp;