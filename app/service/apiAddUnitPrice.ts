import axios from "axios";
import apiServices from "../ExportApi";

export type FormData = {
  item: string;      
  unitPrice: string; 
};

export type DataRow = {
  id: string;
  item: string;
  unitPrice: string;
};

const trimData = (data: FormData): FormData => {
  const trimmedData: FormData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.trim()])
  ) as FormData;
  return trimmedData;
};

export const sendDataBackend = async (data: FormData): Promise<DataRow[]> => {
  try {
    const trimmedData = trimData(data); // Trim the single data object
    console.log("Transformed Data to be sent:", trimmedData);
    
    const response = await apiServices.post("/registerItem", trimmedData);
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