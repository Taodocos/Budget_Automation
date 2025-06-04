import apiServices from "../ExportApi";



export const fetchManBy = async () => {
    try {
        const response = await apiServices.get(`/OperationreportByDistrict`);
        if (!response || !response.data) {
            throw new Error('No data found or invalid response');
        }
        console.log("Fetched dropdown data:", response.data);
        return response.data; // Return the data array directly
    } catch (error) {
        console.error("Error fetching sources:", error);
        throw error; 
    }
};