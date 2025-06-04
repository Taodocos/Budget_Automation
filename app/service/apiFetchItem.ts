import apiServices from "../ExportApi";

export const fetchSourcesById = async () => {
  try {
    const response = await apiServices.get(`/getallitems`);

   
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
