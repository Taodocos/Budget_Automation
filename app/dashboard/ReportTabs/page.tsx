"use client";

import apiServices from "@/app/ExportApi";
import { fetchBranches } from "@/app/service/apiFetchBranch";
import { useState, useEffect } from "react";

const TabGrid = () => {
    const [gridData, setGridData] = useState<any[]>([]);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [userId, setuserId] = useState<string | null>(null);
    const [Is_Hr, setIsHr] = useState<string | null>(null);
    const [Is_Coo, setIsCoo] = useState<string | null>(null);
    const [IsDis, setIsDis] = useState<string | null>(null);
    const [IsBus, setIsBus] = useState<string | null>(null);
    const [IsBan, setIsBan] = useState<string | null>(null);
    const [group1Expanded, setGroup1Expanded] = useState(false); 
    const [group2Expanded, setGroup2Expanded] = useState(false); 
    const [sectionNotes, setSectionNotes] = useState<{ [key: string]: string }>({});
    var status;
    

    const [editRowId, setEditRowId] = useState<string | null>(null); // Track the row being edited
    const [editValues, setEditValues] = useState<{ [key: string]: any }>({}); // Store values for editing

    
    useEffect(() => {
        const storedDistrictRight = sessionStorage.getItem("district_code");
        setDistrictRight(storedDistrictRight);
        const storedbranchCode = sessionStorage.getItem("branch_name");
        setuserId(storedbranchCode);
        const storeduserId = sessionStorage.getItem("userId");
        setuserId(storeduserId);
        const storedIsHr = sessionStorage.getItem("IsHr");
        setIsHr(storedIsHr);
        const storedIsCoo = sessionStorage.getItem("IsCoo");
        setIsCoo(storedIsCoo);
        const storedIsDis = sessionStorage.getItem("IsDis");
        setIsDis(storedIsDis);
        const storedIsBus = sessionStorage.getItem("IsBus");
        setIsBus(storedIsBus);
        const storedIsBan = sessionStorage.getItem("IsBan");
        setIsBan(storedIsBan);
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

    
    type SectionKey = 'section1' | 'section2' | 'section3'|'section4'|'section5'
    |'section6'|'section7'|'section8'|'section9'|'section10'|'section11'|'section12'
    |'section13'|'section14'|'section15'|'section16'|'section17'|'section18'|'section19'
    |'section20'|'section21'|'section22'|'section23'|'section24'|'section25'|'section26'
    |'section27'|'section28'|'section29'|'section30'|'section31'|'section32'|'section33'|'section34'
    |'section35'|'section36';

    const parentCodes: Record<SectionKey, string> = {
        section1: '8', section2: '9', section3: '10', section4: '11',  section5: '7', section6: '12',  section7: '13',  section8: '14', section9: '15', section10: '16', 
        section11: '17', section12: '83', section13: '84', section14: '85', section15: '86', section16: '87', section17: '88',  section18: '773', 
        section19: '772',  section20: '434', section21: '435', section22: '436',  section23: '437', section24: '438',  section25: '439',  
        section26: '440', section27: '441', section28: '442', 
        section29: '443', section30: '444', section31: '445', section32: '446', section33: '', section34: '8', section35: '9',  section36: '10', 
    };

    const toggleSection = async (sectionKey: SectionKey) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionKey]: !prev[sectionKey],
        }));
        console.log(`Toggled section: ${sectionKey} to ${!expandedSections[sectionKey]}`);

        if (!expandedSections[sectionKey]) {
            setGridData([]); 
            await fetchData(sectionKey, parentCodes[sectionKey]); 
        }
    };

    const fetchData = async (sectionKey: SectionKey, parentCode: string) => {
        // Ensure we have the latest branchCode when fetching data
        if (!branchCode || !parentCode) return;
        console.log("Sending to backend:", {
            branch_code: branchCode, // Selected branch code from the dropdown
            parent_code: parentCode,
        });

        try {
            const response = await apiServices.post('/get_bybranch_parentcode', {
                branch_code: branchCode, // Use selected branch code
                parent_code: parentCode,
            });

            if (response.status === 200) {
                const data = response.data.data; // Accessing the nested data array
                console.log("Data received from backend:", data);
                if (Array.isArray(data)) {
                    setGridData(data); // Set the grid data if it's an array
                } else {
                    console.error("Received data is not an array:", data);
                }
            } else {
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleNoteChange = (sectionKey: string, value: string) => {
        setSectionNotes((prev) => ({
            ...prev,
            [sectionKey]: value,
        }));
    };


    const handleApprove = async (sectionData: any) => {
        
       
        console.log("Section data received for approval:", sectionData);
        const parentCode = sectionData.parent_code;
        const reason = sectionNotes[parentCode] || "salman";
       
console.log("reason to be send", reason);
        const dataToSend = {
            branch_code: branchCode,
            parent_code: sectionData.parent_code,
            reason, 
            isDis: IsDis,
            isCoo: Is_Coo,
            isHr: Is_Hr, 
            status: "2",  
            userId,
            isBus:IsBus,
            isBan:IsBan,
            
        };
    
        console.log("Sending approval data:", dataToSend); 
    
        try {
            const response = await apiServices.put('/approvereject', dataToSend);
            if (response.status === 200) {
                console.log("Approved successfully:", response.data);
                alert("Approved successfully!");
                handleNoteChange(parentCode, "");
              
            } else {
                console.error("Approval failed:", response.status);
            }
        } catch (error) {
            console.error("Error during approval:", error);
        }
    };
    const handleReject = async (sectionData: any) => {
        
        const reason = sectionNotes[sectionData.parent_code] || "";
        
        const dataToSend = {
            userId,
            branch_code: branchCode,
            parent_code: sectionData.parent_code, 
            district_code: districtRight,
            status: 3,
            IsHr: Is_Hr, 
            IsCoo: Is_Coo,
            IsDis: IsDis,
            reason,
        };
    
        console.log("Sending approval data:", dataToSend); // Ensure this logs the full object
    
        try {
      
            const response = await apiServices.put('/approvereject', dataToSend);
            if (response.status === 200) {
                console.log("Rejected:", response.data);
            } else {
                console.error("rejection failed:", response.status);
            }
        } catch (error) {
            console.error("Error during rejection:", error);
        }
    };


    const handleEdit = (row: any) => {
        setEditRowId(row.parentcode); 
        setEditValues(row); 
    };

    const handleChange = (key: string, value: any) => {
        setEditValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = async (row: any) => {
        
        try {
            const response = await apiServices.put('/updateData', editValues);
            if (response.status === 200) {
                
                setGridData((prev) => prev.map(item => (item.parentcode === row.parentcode ? editValues : item)));
                alert("Row updated successfully!");
            }
        } catch (error) {
            console.error("Error updating row:", error);
        } finally {
            setEditRowId(null); 
        }
    };

    const handleCancel = () => {
        setEditRowId(null); 
    };

    


   

    const renderGridForSection1 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderGridForSection2 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
        );
    };

    const renderGridForSection3 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderGridForSection4 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderGridForSection5 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderGridForSection6 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderGridForSection7 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };



    const renderGridForSection8 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderGridForSection9 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderGridForSection10 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection11 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection12 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection13 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection14 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection15 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection16 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection17 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection18 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderGridForSection19 = () => {
        return (
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
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.estimated}
                                        onChange={(e) => handleChange('estimated', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.actual}
                                        onChange={(e) => handleChange('actual', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
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
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
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
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    
    const renderGridForSection20 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                        <th className="border p-2">Item</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Unit Price</th>
                        <th className="border p-2">Total Budget</th>
                        <th className="border p-2">Quarter</th>
                        <th className="border p-2">New</th>
                        <th className="border p-2">Replacement</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {gridData.map((row) => (
                        <tr key={row.parentcode} className="text-sm text-gray-700">
                            <td className="border p-2">{row.item}</td>
                            <td className="border p-2">{row.quantity}</td>
                            <td className="border p-2">{row.unitPrice}</td>
                            <td className="border p-2">{row.totalBudget}</td>
                            <td className="border p-2">{row.quarter}</td>
                            <td className="border p-2">{row.new}</td>
                            <td className="border p-2">{row.replacement}</td>
                          
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    
    const renderGridForSection21 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection22 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection23 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection24 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection25 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection26 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection27 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection28 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection29 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection30 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection31 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    const renderGridForSection32 = () => {
        return (
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Total Budget</th>
                    <th className="border p-2">Quarter</th>
                    <th className="border p-2">New</th>
                    <th className="border p-2">Replacement</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {gridData.map((row) => (
                    <tr key={row.parentcode} className="text-sm text-gray-700">
                        {editRowId === row.parentcode ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.item}
                                        onChange={(e) => handleChange('item', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.quantity}
                                        onChange={(e) => handleChange('quantity', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.unitPrice}
                                        onChange={(e) => handleChange('unitPrice', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={editValues.totalBudget}
                                        onChange={(e) => handleChange('totalBudget', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={editValues.quarter}
                                        onChange={(e) => handleChange('quarter', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
                                    <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2">{row.item}</td>
                                <td className="border p-2">{row.quantity}</td>
                                <td className="border p-2">{row.unitPrice}</td>
                                <td className="border p-2">{row.totalBudget}</td>
                                <td className="border p-2">{row.quarter}</td>
                                <td className="border p-2">{row.new}</td>
                                <td className="border p-2">{row.replacement}</td>
                                <td className="border p-2">
                                    <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };
    
    // const renderGridForSection33 = () => {
    //     return (
    //         <table className="w-full table-auto border-collapse border border-gray-300">
    //             <thead>
    //                 <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
    //                 <th className="border p-2">Allowance</th>
    //                 <th className="border p-2">Jul</th>
    //                 <th className="border p-2">Aug</th>
    //                 <th className="border p-2">Sep</th>
    //                 <th className="border p-2">Oct</th>
    //                 <th className="border p-2">Nov</th>
    //                 <th className="border p-2">Dec</th>
    //                 <th className="border p-2">Jan</th>
    //                 <th className="border p-2">Feb</th>
    //                 <th className="border p-2">Mar</th>
    //                 <th className="border p-2">Apr</th>
    //                 <th className="border p-2">May</th>
    //                 <th className="border p-2">Jun</th>
    //                 <th className="border p-2">Actions</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {gridData.map((row) => (
    //                 <tr key={row.id} className="text-sm text-gray-700">
    //                     {editRowId === row.id ? (
    //                         <>
    //                              <td className="border p-2">{row.allowanceDesc}</td>
    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.jul}
    //                                     onChange={(e) => handleChange('jul', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>
    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.aug}
    //                                     onChange={(e) => handleChange('aug', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>

    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.aug}
    //                                     onChange={(e) => handleChange('sep', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>

    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.aug}
    //                                     onChange={(e) => handleChange('oct', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>

    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.aug}
    //                                     onChange={(e) => handleChange('nov', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>

    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.aug}
    //                                     onChange={(e) => handleChange('dec', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>

    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.feb}
    //                                     onChange={(e) => handleChange('feb', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>
    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.mar}
    //                                     onChange={(e) => handleChange('mar', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>
    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.apr}
    //                                     onChange={(e) => handleChange('apr', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>

    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.may}
    //                                     onChange={(e) => handleChange('may', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>
    //                             <td className="border p-2">
    //                                 <input
    //                                     type="number"
    //                                     value={editValues.jun}
    //                                     onChange={(e) => handleChange('jun', e.target.value)}
    //                                     className="border rounded p-1"
    //                                 />
    //                             </td>
                            
                            
    //                             <td className="border p-2">
    //                                 <button onClick={() => handleSave(row)} className="bg-green-500 text-white p-1 rounded">Save</button>
    //                                 <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
    //                             </td>
    //                         </>
    //                     ) : (
    //                         <>
    //                             <td className="border p-2">{row.allowanceDesc}</td>
    //                             <td className="border p-2">{row.jul}</td>
    //                             <td className="border p-2">{row.aug}</td>
    //                             <td className="border p-2">{row.sep}</td>
    //                             <td className="border p-2">{row.oct}</td>
    //                             <td className="border p-2">{row.nov}</td>
    //                             <td className="border p-2">{row.dec}</td>
    //                             <td className="border p-2">{row.jan}</td>
    //                             <td className="border p-2">{row.feb}</td>
    //                             <td className="border p-2">{row.mar}</td>
    //                             <td className="border p-2">{row.apr}</td>
    //                             <td className="border p-2">{row.may}</td>
    //                             <td className="border p-2">{row.jun}</td>
    //                             <td className="border p-2">
    //                                 <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
    //                             </td>
    //                         </>
    //                     )}
    //                 </tr>
    //             ))}
    //             </tbody>
    //         </table>
    //     );
    // };
    

 
    return (
      <div className="p-6 bg-gray-100 overflow-hidden ">
          {/* Dropdown for Branch Selection */}
          <select
              value={branchCode || ""}
              onChange={(e) => setBranchCode(e.target.value)} // Allow changes to branch code
              className="mb-4 p-2 border rounded text-black"
          >
              <option value="" disabled>Select a branch</option>
              {branches.map((branch) => (
                  <option key={branch.branch_code} value={branch.branch_code}>
                      {`${branch.branch_code} - ${branch.branch_name}`}
                  </option>
              ))}
          </select>

          <div className="bg-white shadow-md rounded p-4 font-bold bg-black-200 text-black ">
              {/* Collapsible Section 1 */}
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section1')} className="flex items-center">
                      {expandedSections['section1'] ? "Conventional Deposit" : "Conventional Deposit"}
                      
                  </button>
                  {expandedSections['section1'] && (
                      <div className="mt-2">
                          {renderGridForSection1()}
                          {/* <div className="mt-2">
                           
                          <textarea
                                className="mt-2 w-full border rounded p-2"
                                placeholder="Enter notes for Section 1"
                                value={sectionNotes['section1'] || ""}
                                onChange={(e) => handleNoteChange('section1', e.target.value)}
                            />
                        </div>
                          <div className="flex justify-end mt-4">
                                <button 
                onClick={() => {
                   
                    handleApprove({ parent_code: parentCodes['section1'] });
                }} 
                className="bg-green-500 text-white p-2 rounded mr-2">
                Approve
            </button>    <button onClick={() => handleReject({ parent_code: parentCodes['section1'] })} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div>
                             */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section2')} className="flex items-center">
                      {expandedSections['section2'] ? "Interest Free banking" : "Interest Free banking"}
                  </button>
                  {expandedSections['section2'] && (
                      <div className="mt-2">
                          {renderGridForSection2()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-100 overflow-y-auto">
                  <button onClick={() => toggleSection('section3')} className="flex items-center">
                      {expandedSections['section3'] ? "FCY Sources/ USDT" : "FCY Sources/ USDT"}
                  </button>
                  {expandedSections['section3'] && (
                      <div className="mt-2">
                          {renderGridForSection3()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section4')} className="flex items-center">
                      {expandedSections['section4'] ? "Share Capital" : "Share Capital"}
                  </button>
                  {expandedSections['section4'] && (
                      <div className="mt-2">
                          {renderGridForSection4()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section5')} className="flex items-center">
                      {expandedSections['section5'] ? "Outstanding Loans and Advances by Maturity" : "Outstanding Loans and Advances by Maturity"}
                  </button>
                  {expandedSections['section5'] && (
                      <div className="mt-2">
                          {renderGridForSection5()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section6')} className="flex items-center">
                      {expandedSections['section6'] ? "Outstanding loans and advances by Type" : "Outstanding loans and advances by Type"}
                  </button>
                  {expandedSections['section6'] && (
                      <div className="mt-2">
                          {renderGridForSection6()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section7')} className="flex items-center">
                      {expandedSections['section7'] ? "Outstanding by Economic Sector" : "Outstanding by Economic Sector"}
                  </button>
                  {expandedSections['section7'] && (
                      <div className="mt-2">
                     
                          {renderGridForSection7()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section8')} className="flex items-center">
                      {expandedSections['section8'] ? " Disbursement" : " Disbursement"}
                  </button>
                  {expandedSections['section8'] && (
                      <div className="mt-2">
                          {renderGridForSection8()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section9')} className="flex items-center">
                      {expandedSections['section9'] ? "Collection" : "Collection"}
                  </button>
                  {expandedSections['section9'] && (
                      <div className="mt-2">
                          {renderGridForSection9()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
                 {/* Collapsible Section 2 */}
                 <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section10')} className="flex items-center">
                      {expandedSections['section10'] ? "CustomerAttraction" : "CustomerAttraction"}
                  </button>
                  {expandedSections['section10'] && (
                      <div className="mt-2">
                          {renderGridForSection10()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section11')} className="flex items-center">
                      {expandedSections['section11'] ? "DigitalBankingSubs" : "DigitalBankingSubs"}
                  </button>
                  {expandedSections['section11'] && (
                      <div className="mt-2">
                          {renderGridForSection11()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section12')} className="flex items-center">
                      {expandedSections['section12'] ? "Interest Income" : "Interest Income"}
                  </button>
                  {expandedSections['section12'] && (
                      <div className="mt-2">
                          {renderGridForSection12()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section13')} className="flex items-center">
                      {expandedSections['section13'] ? "Commission Income" : "Commission Income"}
                  </button>
                  {expandedSections['section13'] && (
                      <div className="mt-2">
                          {renderGridForSection13()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section14')} className="flex items-center">
                      {expandedSections['section14'] ? "Other Income" : "Other Income"}
                  </button>
                  {expandedSections['section14'] && (
                      <div className="mt-2">
                          {renderGridForSection14()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section15')} className="flex items-center">
                      {expandedSections['section15'] ? "Interest Expense" : "Interest Expense"}
                  </button>
                  {expandedSections['section15'] && (
                      <div className="mt-2">
                          {renderGridForSection15()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section16')} className="flex items-center">
                      {expandedSections['section16'] ? "Salary Benefit" : "Salary Benefit"}
                  </button>
                  {expandedSections['section16'] && (
                      <div className="mt-2">
                          {renderGridForSection16()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section17')} className="flex items-center">
                      {expandedSections['section17'] ? "General Expense" : "General Expense"}
                  </button>
                  {expandedSections['section17'] && (
                      <div className="mt-2">
                          {renderGridForSection17()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section18')} className="flex items-center">
                      {expandedSections['section18'] ? "Controllable Expenses HQ" : "Controllable Expenses HQ"}
                  </button>
                  {expandedSections['section18'] && (
                      <div className="mt-2">
                          {renderGridForSection18()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section19')} className="flex items-center">
                      {expandedSections['section19'] ? "Controllable Expenses Branches" : "Controllable Expenses Branches"}
                  </button>
                  {expandedSections['section19'] && (
                      <div className="mt-2">
                          {renderGridForSection19()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section20')} className="flex items-center">
                      {expandedSections['section20'] ? "Office Furniture" : "Office Furniture"}
                  </button>
                  {expandedSections['section20'] && (
                      <div className="mt-2">
                          {renderGridForSection20()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section21')} className="flex items-center">
                      {expandedSections['section21'] ? "Office Equipment" : "Office Equipment"}
                  </button>
                  {expandedSections['section21'] && (
                      <div className="mt-2">
                          {renderGridForSection21()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section22')} className="flex items-center">
                      {expandedSections['section22'] ? "IT Hardware" : "IT Hardware"}
                  </button>
                  {expandedSections['section22'] && (
                      <div className="mt-2">
                          {renderGridForSection22()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section23')} className="flex items-center">
                      {expandedSections['section23'] ? "Other IT Items" : "Other IT Items"}
                  </button>
                  {expandedSections['section23'] && (
                      <div className="mt-2">
                          {renderGridForSection23()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section24')} className="flex items-center">
                      {expandedSections['section24'] ? "Security Items" : "Security Items"}
                  </button>
                  {expandedSections['section24'] && (
                      <div className="mt-2">
                          {renderGridForSection24()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section25')} className="flex items-center">
                      {expandedSections['section25'] ? "Vechile" : "Vechile"}
                  </button>
                  {expandedSections['section25'] && (
                      <div className="mt-2">
                          {renderGridForSection25()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section26')} className="flex items-center">
                      {expandedSections['section26'] ? "Counter And Al" : "Counter And Al"}
                  </button>
                  {expandedSections['section26'] && (
                      <div className="mt-2">
                          {renderGridForSection26()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section27')} className="flex items-center">
                      {expandedSections['section27'] ? "Other Items for Digital Banking" : "Other Items for Digital Banking"}
                  </button>
                  {expandedSections['section27'] && (
                      <div className="mt-2">
                          {renderGridForSection27()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section28')} className="flex items-center">
                      {expandedSections['section28'] ? "Project Cap" : "Project Cap"}
                  </button>
                  {expandedSections['section28'] && (
                      <div className="mt-2">
                          {renderGridForSection28()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section29')} className="flex items-center">
                      {expandedSections['section29'] ? "Stationary" : "Stationary"}
                  </button>
                  {expandedSections['section29'] && (
                      <div className="mt-2">
                          {renderGridForSection29()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>
              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section30')} className="flex items-center">
                      {expandedSections['section30'] ? "BankFormat" : "BankFormat"}
                  </button>
                  {expandedSections['section30'] && (
                      <div className="mt-2">
                          {renderGridForSection30()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section31')} className="flex items-center">
                      {expandedSections['section31'] ? "Uniform" : "Uniform"}
                  </button>
                  {expandedSections['section31'] && (
                      <div className="mt-2">
                          {renderGridForSection31()}
                          {/* <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div> */}
                      </div>
                  )}
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                  <button onClick={() => toggleSection('section32')} className="flex items-center">
                      {expandedSections['section32'] ? "OtherSupplies" : "OtherSupplies"}
                  </button>
                  {expandedSections['section32'] && (
                      <div className="mt-2">
                          {renderGridForSection32()}
                          <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div>
                      </div>
                  )}
              </div>

              {/* <div className="mb-4">
                  <button onClick={() => toggleSection('section33')} className="flex items-center">
                      {expandedSections['section33'] ? "OtherSupplies" : "OtherSupplies"}
                  </button>
                  {expandedSections['section33'] && (
                      <div className="mt-2">
                          {renderGridForSection33()}
                          <div className="flex justify-end mt-4">
                                <button onClick={handleApprove} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                                <button onClick={handleReject} className="bg-red-500 text-white p-2 rounded">Reject</button>
                            </div>
                      </div>
                  )}
              </div> */}

              {/* Add more sections as needed */}
          </div>
          <div className="mt-4">
          
          </div>
      </div>
  );
};

export default TabGrid;