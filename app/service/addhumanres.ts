import axios from "axios";
import apiServices from "../ExportApi";

export type FormSubmissionData = {
    existingStaff: string;
    additionalStaff: string;
    parent_code: string;
    branch_code: string; // Ensure compatibility
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
    new: number;
    replacement: number;
};

export type DataRow = {
    id: string;
    title: string;
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
    new: number;
    replacement: number;
};

// Update trimData to handle only string fields
const trimData = (data: FormSubmissionData): FormSubmissionData => {
    return {
        ...data,
        existingStaff: typeof data.existingStaff === 'string' ? data.existingStaff.trim() : data.existingStaff,
        additionalStaff: typeof data.additionalStaff === 'string' ? data.additionalStaff.trim() : data.additionalStaff,
        parent_code: typeof data.parent_code === 'string' ? data.parent_code.trim() : data.parent_code,
        branch_code: typeof data.branch_code === 'string' ? data.branch_code.trim() : data.branch_code,
        jul: typeof data.jul === 'string' ? data.jul.trim() : data.jul,
        aug: typeof data.aug === 'string' ? data.aug.trim() : data.aug,
        sep: typeof data.sep === 'string' ? data.sep.trim() : data.sep,
        oct: typeof data.oct === 'string' ? data.oct.trim() : data.oct,
        nov: typeof data.nov === 'string' ? data.nov.trim() : data.nov,
        dec: typeof data.dec === 'string' ? data.dec.trim() : data.dec,
        jan: typeof data.jan === 'string' ? data.jan.trim() : data.jan,
        feb: typeof data.feb === 'string' ? data.feb.trim() : data.feb,
        mar: typeof data.mar === 'string' ? data.mar.trim() : data.mar,
        apr: typeof data.apr === 'string' ? data.apr.trim() : data.apr,
        may: typeof data.may === 'string' ? data.may.trim() : data.may,
        jun: typeof data.jun === 'string' ? data.jun.trim() : data.jun,
        new: data.new, 
        replacement: data.replacement 
    };
};
export const sendDataBackend = async (data: FormSubmissionData[]): Promise<DataRow[]> => {
    try {
        const trimmedData = data.map(trimData);
        console.log("Transformed Data to be sent:", trimmedData);
        
        const response = await apiServices.post("/addformdata", trimmedData);
        console.log("Response data:", response.data);
        window.alert(`Data submitted successfully`);
        
        return response.data; 
    } catch (err) {
        console.error("Error sending data:", err);
        
        if (axios.isAxiosError(err)) {
            if (err.response) {
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
                window.alert(`Error: ${err.response.data.message || "Unknown error"}`);
            } else {
                console.error("Error message:", err.message);
            }
        } else {
            console.error("Unexpected error:", err);
        }
        
        return []; 
    }
};

export default apiServices;