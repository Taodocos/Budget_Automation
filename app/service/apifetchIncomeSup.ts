import apiServices from "../ExportApi";

export const fetchSourcesById = async (id: string) => {
    try {
        console.log("Fetching sources for ID:", id);
        const response = await apiServices.get(`/getIncomeandSupply?parentcode=${id}`);

        console.log("API Response:", response.data);

        // Check if the response structure is valid
        if (!response || !response.data || !Array.isArray(response.data)) {
            throw new Error('No data found or invalid response');
        }

        return response.data; // Return the data array
    } catch (error) {
        //console.error(`Error fetching sources for ID ${id}: ${error.message}`);
        throw error; 
    }
};