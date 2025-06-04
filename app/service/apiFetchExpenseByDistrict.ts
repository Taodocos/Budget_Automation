import apiServices from '../ExportApi';

export interface ReportFormData {
  branch_code: string; // Change from any to string
  id: string; 
  parentCode: string;
  userId: string;
  expensesdesc: string;
  FiscalYear: string;
  totalAmount: string;
}

export const fetchSourcesById = async () => {
  try {
    const response = await apiServices.get(`/getexpensebydistrict`);

    if (!response || !response.data) {
      throw new Error('No data found or invalid response');
    }

    console.log("Fetched dropdown data:", response.data); // Log the fetched data
    return response.data; // Return the data array directly
  } catch (error) {
    console.error("Error fetching sources:", error);
    throw error; 
  }
};