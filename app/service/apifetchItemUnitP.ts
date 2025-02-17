import apiServices from "../ExportApi";

export const fetchSourcesById = async () => {
  try {
    const response = await apiServices.get(`/getformats_by_id?parent_code`);

   
    if (!response || !response.data || response.data.statusCode !== 201) {
      throw new Error('No data found or invalid response');
    }

    console.log("Fetched dropdown data:", response.data.data); 
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching sources:", error);
    throw error; 
  }
};