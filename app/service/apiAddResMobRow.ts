import apiServices from "../ExportApi";
import { ReportFormData } from "./apifetchResMon";



export const saveData = async (data: ReportFormData) => {
  try {
      const formattedData = {
          actual: data.actual,
          estimated: data.estimated,
          netincrement: data.netincrement,
          projected: data.projected,
          parent_code: data.parentcode, // Ensure this matches your API's expectations
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
          branch_code: data.branch_code, // Ensure this matches your API's expectations
      };
      console.log("data to save before:", formattedData)
      const response = await apiServices.post(`http://172.16.239.178:5289/Bplan_api/app/save`, formattedData);
      console.log("data to save:", formattedData)
      window.alert(`Data updated successfully`);
      return response.data; // Return the response for further processing if needed
  } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data'); // Rethrow the error to be handled in the calling function
  }
};