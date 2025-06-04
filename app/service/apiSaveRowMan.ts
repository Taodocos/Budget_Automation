import apiServices from "../ExportApi"; // Ensure this path is correct
import { ReportFormData } from "./fetchManPower";

 // Ensure this import is correct

export const saveData = async (data: ReportFormData) => {
    try {
        const formattedData = {
            jobPosId: data.jobPosId,
            branch_code: data.branch_code, 
            existingStaff: data.existingStaff, 
            additionalStaff: data.additionalStaff, 
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


        console.log("tobe saved",formattedData)
        const response = await apiServices.put(`/updateManpower`, formattedData);
        
        window.alert(`Data updated successfully`);
        return response.data;

    } catch (error) {
        console.error('Error saving data:', error); // Log the error for debugging
        throw new Error('Failed to save data');
    }
};