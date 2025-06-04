import apiServices from "../ExportApi";
import { ReportFormData } from "./apifetchResMon";



export const saveData = async (data: ReportFormData) => {
  try {
    
   

      const formattedData = {
          actual: data.actual,
          estimated: data.estimated,
          
          parent_code: data.parentcode, 
          Jul: data.jul,
          Aug: data.aug,
          Sep: data.sep,
          Oct: data.oct,
          Nov: data.nov,
          Dec: data.dec,
          Jan: data.jan,
          Feb: data.feb,
          Mar: data.mar,
          Apr: data.apr,
          May: data.may,
          Jun: data.jun,
          branch_code: data.branch_code, 
      };
      console.log("data to save before:", formattedData)
      const response = await apiServices.post(`/save`, formattedData);
      console.log("data to save:", formattedData)
      window.alert(`Data updated successfully`);
      return response.data; // Return the response for further processing if needed
  } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data'); // Rethrow the error to be handled in the calling function
  }
};