import apiServices from '../ExportApi';


export interface ReportFormData { 
  id: string; 
  //branch_code: string;
  parentCode:string;
  userId:string,
  item:string,
  quantity: string,
  unitPrice: string,
  totalBudget:string,
  quarter: string,
 
}





export const fetchSourcesById = async () => {
  try {
    const response = await apiServices.get(`/getexpenditurebydistrict`);

   
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