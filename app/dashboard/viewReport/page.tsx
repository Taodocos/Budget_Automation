"use client";

import apiServices from "@/app/ExportApi";
import { fetchBranches } from "@/app/service/apiFetchBranch";
import { useState, useEffect } from "react";

const EditableGrid = () => {
    const [gridData, setGridData] = useState<any[]>([]);
    const [branches, setBranches] = useState<{ branch_code: string; branch_name: string }[]>([]);
    const [districtRight, setDistrictRight] = useState<string | null>(null);
    const [branchCode, setBranchCode] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [sectionNotes, setSectionNotes] = useState<{ [key: string]: string }>({});

   



    useEffect(() => {
        const storedDistrictRight = sessionStorage.getItem("district_code");
        setDistrictRight(storedDistrictRight);
        const storedBranchCode = sessionStorage.getItem("branch_name");
        setBranchCode(storedBranchCode);
        const storedUserId = sessionStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    const [editRowId, setEditRowId] = useState<string | null>(null); // Track the row being edited
    const [editValues, setEditValues] = useState<{ [key: string]: any }>({}); // Store values for editing


    const handleEdit = (row: any) => {
        setEditRowId(row.parentcode); // Set the row being edited
        setEditValues(row); // Populate edit values with the row data
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
                setGridData((prev) =>
                    prev.map((item) => (item.parentcode === row.parentcode ? editValues : item))
                );
                alert("Row updated successfully!");
            }
        } catch (error) {
            console.error("Error updating row:", error);
        } finally {
            setEditRowId(null); // Reset edit row ID
        }
    };




    useEffect(() => {
        const fetchBranchData = async () => {
            if (districtRight) {
                const branchData = await fetchBranches(branchCode || "", districtRight);
                setBranches(branchData);
            }
        };
        fetchBranchData();
    }, [districtRight, branchCode]);

    const parentCodes: Record<string, string> = {
        section1: '8',
        section2: '9',
        section3: '10',
        // Add other sections as needed
    };

    const fetchData = async (parentCode: string) => {
        if (!branchCode || !parentCode) return;

        try {
            const response = await apiServices.post('/get_bybranch_parentcode', {
                branch_code: branchCode,
                parent_code: parentCode,
            });

            if (response.status === 200) {
                const data = response.data.data;
                if (Array.isArray(data)) {
                    setGridData(data);
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

    const handleSectionChange = (sectionKey: string) => {
        fetchData(parentCodes[sectionKey]);
    };

    const renderGrid = () => {
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
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="p-6 bg-gray-100 overflow-hidden">
            {/* Dropdown for Branch Selection */}
            <select
                value={branchCode || ""}
                onChange={(e) => setBranchCode(e.target.value)}
                className="mb-4 p-2 border rounded text-black"
            >
                <option value="" disabled>Select a branch</option>
                {branches.map((branch) => (
                    <option key={branch.branch_code} value={branch.branch_code}>
                        {`${branch.branch_code} - ${branch.branch_name}`}
                    </option>
                ))}
            </select>

            <div className="bg-white shadow-md rounded p-4">
                {/* Section Buttons */}
                {Object.keys(parentCodes).map((sectionKey) => (
                    <div key={sectionKey} className="mb-4">
                        <button
                            onClick={() => handleSectionChange(sectionKey)}
                            className="flex items-center text-blue-600 hover:underline"
                        >
                            {sectionKey}
                        </button>
                    </div>
                ))}

                {/* Render the grid */}
                {renderGrid()}
            </div>
        </div>
    );
};

export default EditableGrid;