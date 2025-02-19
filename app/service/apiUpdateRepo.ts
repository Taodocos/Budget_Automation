import apiServices from "../ExportApi"; // Ensure this path is correct
import { ReportFormData } from "./apiFetchHumanR";
 // Ensure this import is correct

export const saveData = async (data: ReportFormData) => {
    try {
        // Ensure the structured data matches the API requirements
        const formattedData = {
            //parentcode: data.parentcode, 
            branch_code: data.branch_code, 
            //DeptDesc: data.DeptDesc, 
            AllowanceDesc: data.allowanceDesc, 
            //JobPosition: data.JobPosition, 
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
            New: data.new,
            Replacement: data.replacement 
        };

        // Make the API call to update data
        const response = await apiServices.put(`/updateFormats`, formattedData);
        window.alert(`Data updated successfully`);
        return response.data;

    } catch (error) {
        console.error('Error saving data:', error); // Log the error for debugging
        throw new Error('Failed to save data');
    }
};