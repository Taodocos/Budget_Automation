import apiServices from '../ExportApi';

export type ReportFormData = {
    id: string;
    branch_code: string; // Ensure this is included
    estimated: string;
    actual: string;
    netincrement: string;
    projected: string;
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

// Define the interface for each row in the API response
export interface ApiResponseRow {
    allowanceDesc: string;
    estimated: string;
    actual: string;
    netincrement: string;
    projected: string;
    // Adding branch_code as it seems necessary
    branch_code: string; 
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

        const response = await apiServices.post('/getAgregatetotal', payload);
        console.log("API Response received:", JSON.stringify(response.data, null, 2)); 

        // Check if the response contains valid data
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            const rowsWithId = response.data.map((row: ApiResponseRow, index: number) => {
                const uniqueId = `${branchCode}-${row.allowanceDesc}-${index}`; 
                return {
                    id: uniqueId,
                    branch_code: branchCode, // Ensure branch_code is included
                    estimated: row.estimated,
                    actual: row.actual,
                    netincrement: row.netincrement,
                    projected: row.projected,
                    jul: row.jul,
                    aug: row.aug,
                    sep: row.sep,
                    oct: row.oct,
                    nov: row.nov,
                    dec: row.dec,
                    jan: row.jan,
                    feb: row.feb,
                    mar: row.mar,
                    apr: row.apr,
                    may: row.may,
                    jun: row.jun,
                };
            });
            return rowsWithId; // No need for 'as ReportFormData[]' since the structure matches
        } else {
            console.log("No valid data returned for the given branch code.");
            return []; 
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        return [];
    }
};