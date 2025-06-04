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
  new: string;
  replacement: string;
};

// Function to trim data entries
const trimData = (data: FormData): FormData => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value ? value.trim() : '', // Handle null or undefined values
    ])
  ) as FormData;
};

// Function to send data to the backend
export const sendDataBackend = async (data: FormData[]): Promise<{ data: DataRow[]; status: number }> => {
  try {
    // Trim the data before sending
    const trimmedData = data.map(trimData);
    console.log("Transformed Data to be sent:", trimmedData);
    
    // Send the data using the API service
    const response = await apiServices.post("/addCapitalSupplies", trimmedData);
    console.log("Response data:", response.data);
    
    window.alert(`Data submitted successfully`);
    
    // Return the response data and status
    return { data: response.data, status: response.status };
  } catch (err) {
    console.error("Error sending data:", err);
    
    // Handle Axios errors specifically
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        
        // Check for status code 400 and use the specific error message
        if (err.response.status === 400) {
          const errorMessage = err.response.data.message || "Item price not set"; // Use the API's message or a default
          window.alert(errorMessage);
        } else {
          window.alert(`Error: ${err.response.data.message || "Unknown error"}`);
        }
        
        // Return the error response data and status code
        return { data: [], status: err.response.status }; 
      } else {
        console.error("Error message:", err.message);
      }
    } else {
      console.error("Unexpected error:", err);
    }
    
    // Return an empty array and a generic error status
    return { data: [], status: 500 }; 
  }
};

export default apiServices;