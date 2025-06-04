import apiServices from "../ExportApi";
import { ReportFormData } from "./apigetExpense";





export const saveData = async (data: ReportFormData, userId: string | null) => {
  try {
      const formattedData = {
        expenseId: data.expenseId,
        totalAmount: data.totalAmount,
        userName: userId, 
        branch_code: data.branch_code, 
      };
      console.log("Data to save before:", formattedData);
      const response = await apiServices.post(`/addexpenses`, formattedData);
      console.log("Data to save:", formattedData);
      window.alert(`Data updated successfully`);
      return response.data; 
  } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save data'); 
  }
};