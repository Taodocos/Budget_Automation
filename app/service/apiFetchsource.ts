import apiServices from "../ExportApi";

export const fetchSourcesById = async (id: string) => {
  try {
    const response = await apiServices.get(`/getformats_by_id?parent_code=${id}`);

    // Check if the response structure is valid
    if (!response || !response.data || response.data.statusCode !== 201) {
      throw new Error('No data found or invalid response');
    }

    console.log("Fetched dropdown data:", response.data.data); // Log the fetched data
    return response.data.data; // Return the data array
  } catch (error) {
    console.error("Error fetching sources:", error);
    throw error; 
  }
};