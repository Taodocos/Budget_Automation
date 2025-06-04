import apiServices from '../ExportApi';

export interface ReportFormData {
    id: string;
    estimated: string;
    actual: string;
    netincrement: string;
    projected: string;
    branch_code: string;
    district_code: string;
    parentcode: string; 
    status: string;
    description: string;
    jul: string;  
    aug: string;
    sep: string;
    oct: string;
    nov: string;
    dec: string;
    jan: string;
    feb: string;
    mar: string;
    apr: string;
    may: string;
    jun: string;
}

// Define the interface for the API response
export interface ApiResponseData {
    branch_code: string;
    parentcode: string;
    estimated: string;
    actual: string;
    netincrement: string; 
    projected: string;
    status: string;
    description: string;
    jul: string;  
    aug: string;
    sep: string;
    oct: string;
    nov: string;
    dec: string;
    jan: string;
    feb: string;
    mar: string;
    apr: string;
    may: string;
    jun: string;
}

export const fetchDataBackend = async (branchCode: string): Promise<ReportFormData[]> => {
    try {
        const payload = { branch_code: branchCode };
        console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('/getbranchreports', payload);
        console.log("Original API Response:", response.data);

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            const rowsWithId = response.data.map((row: ApiResponseData, index: number) => {
                const uniqueId = `${row.branch_code}-${row.parentcode}-${index}`;
                console.log("Generated Unique ID:", uniqueId);
                return {
                    ...row,
                    id: uniqueId,
                };
            });
            return rowsWithId as ReportFormData[];
        } else {
            console.log("No data returned for the given branch code.");
            return [];
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        return [];
    }
};