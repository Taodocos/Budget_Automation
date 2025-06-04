import apiServices from "../ExportApi";
import { ReportFormData } from "./apiFetchEditData";

export const saveData = async (data: ReportFormData) => {
    try {
        const formattedData = {
            actual: data.actual, 
            estimated: data.estimated,
            netincrement: data.netincrement,
            projected: data.projected,
            parent_code: data.parentcode, 
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
            branchcode: data.branch_code 
        };

        const response = await apiServices.put(`/updateFormats`, formattedData);
        window.alert(`Data updated successfully`);
        console.log(data.id);
        return response.data;
        
    } catch (error) {
        console.error('Error saving data:', error); // Log the error
        throw new Error('Failed to save data');
    }
};