import axios from "axios";
import apiServices from "../ExportApi";

export type FormSubmissionData = {
    existingStaff: string;
    additionalStaff: string;
    JobPosId:string;
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
    New: string; // Changed to lowercase 'new' to match your usage
    replacement: string;
};

export type DataRow = {
    id: string;
    JobPosId: string;
    existingStaff: string;
    additionalStaff: string;
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
    New: string; 
    replacement: string;
};

// Update trimData to handle only string fields
const trimData = (data: FormSubmissionData): FormSubmissionData => {
    return {
        ...data,
        existingStaff: data.existingStaff, 
        additionalStaff: data.additionalStaff, 
        JobPosId:data.JobPosId,
        jul: data.jul,
        aug: data.aug,
        sep: data.sep,
        oct: data.oct,
        nov: data.nov,
        dec: data.dec,
        jan: data.jan,
        feb: data.feb,
        mar: data.mar,
        apr: data.apr,
        may: data.may,
        jun: data.jun,
        New: data.New, 
        replacement: data.replacement 
    };
};

export const sendDataBackend = async (data: FormSubmissionData[]): Promise<DataRow[]> => {
    try {
        const trimmedData = data.map(trimData);
        console.log("Transformed Data to be sent:", trimmedData);
        
        const response = await apiServices.post("/addManPower", trimmedData);
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