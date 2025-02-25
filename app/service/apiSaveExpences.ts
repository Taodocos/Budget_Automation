import apiServices from "../ExportApi";
import { ReportFormData } from "./apiFetchExpense";




export const saveData = async (data: ReportFormData) => {
  try {
      const formattedData = {
       
        expensesdesc: data.expensesdesc,
        TotalAmount: data.TotalAmount,
          userName: data.userId,
          branch_code: data.branch_code, // Ensure this matches your API's expectations
      };
      console.log("data to save before:", formattedData)
      const response = await apiServices.post(`/addexpenses`, formattedData);
      console.log("data to save:", formattedData)
      window.alert(`Data updated successfully`);
      return response.data; // Return the response for further processing if needed
  } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data'); // Rethrow the error to be handled in the calling function
  }
};