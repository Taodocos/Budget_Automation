import axios from "axios";
import apiServices from "../ExportApi";

export type FormData = {
  quantity: string;
  unitPrice: string;
  totalBudget: string;
  parent_code: string;
  quarter: string;
  new: string;
  replacement: string; 
};

export type DataRow = {
  id: string; 
  item: string; 
  quantity: string;
  unitPrice: string;
  totalBudget: string;
  quarter: string;
  parent_code: string;
  branch_code: string;
  new: string;
  replacement: string;
};

const trimData = (data: FormData): FormData => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.trim()])
  ) as FormData;
};

export const sendDataBackend = async (data: FormData[]): Promise<DataRow[]> => {
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