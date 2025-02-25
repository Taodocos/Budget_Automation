import axios from "axios";
import apiServices from "../ExportApi";


export type FormData = {
  item: string;
  quantity: string;
  parent_code: string;
  quarter: string;
  New: string; 
  replacement: string; 
};

// Define the structure for data rows returned from the backend
export type DataRow = {
  id: string; 
  item: string; 
  quantity: string;
  quarter: string;
  branch_code: string;
  parent_code: string;
  New: string;
  replacement: string;
};


const trimData = (data: FormData): FormData => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.trim()])
  ) as FormData;
};

// Function to send data to the backend
export const sendDataBackend = async (data: FormData[]): Promise<DataRow[]> => {
  try {
    // Trim the data before sending
    const trimmedData = data.map(trimData);
    console.log("Transformed Data to be sent:", trimmedData);
    
    // Send the data using the API service
    const response = await apiServices.post("/addCapitalSupplies", trimmedData);
    console.log("Response data:", response.data);
    window.alert(`Data submitted successfully`);
    
    return response.data; 
  } catch (err) {
    console.error("Error sending data:", err);
    
    // Handle Axios errors specifically
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
    
    // Return an empty array in case of error
    return []; 
  }
};

export default apiServices;