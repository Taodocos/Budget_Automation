import { ReportFormData } from "../dashboard/Capital&Supplies/CapitalItem/page";
import apiServices from "../ExportApi";




export const saveData = async (data: ReportFormData) => {
  try {
    
   

      const formattedData = {
      
          qty: data.qty,
          quarter: data.quarter,
          item_code: data.item_code, 
          branch_code: data.branch_code, 
      };
      console.log("data to save before:", formattedData)
      const response = await apiServices.put(`/updateCapitalSupplies`, formattedData);
      console.log("data to save:", formattedData)
      window.alert(`Data updated successfully`);
      return response.data; // Return the response for further processing if needed
  } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data'); // Rethrow the error to be handled in the calling function
  }
};