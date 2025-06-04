import axios from "axios";
import apiServices from "../ExportApi";

export type FormData = {
  actual: string;
  estimated: string;
  parent_code: string;
  Jul: string;
  Aug: string;
  Sep: string;
  Oct: string;
  Nov: string;
  Dec: string;
  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  May: string;
  Jun: string;
};

export type DataRow = {
  id: string; 
  source: string; 
  actualMarch: string;
  estimatedJune: string;
  parent_code: string;
  branch_code: string;
  district_code: string;
  Jul: string;
  Aug: string;
  Sep: string;
  Oct: string;
  Nov: string;
  Dec: string;
  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  May: string;
  Jun: string;
};

const trimData = (data: FormData): FormData => {
  const trimmedData: FormData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value ? value.trim() : '']) // Handle null or undefined values
  ) as FormData;
  return trimmedData;
};

export const sendDataBackend = async (data: FormData[]): Promise<DataRow[]> => {
  try {
    const trimmedData = data.map(trimData);
    console.log("Transformed Data to be sent:", trimmedData);
    
    const response = await apiServices.post("/sumbit", trimmedData);
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