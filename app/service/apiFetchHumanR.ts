import apiServices from '../ExportApi';

export type ReportFormData = {
    id: string;
    branch_code: string; 
    allowanceDesc: string; 
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
    new: string; 
    replacement: string; 
}

export const fetchDataBackend = async (branchCode: string): Promise<ReportFormData[]> => {
    try {
        const payload = { branch_code: branchCode };
        console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('http://172.16.239.178:5289/Bplan_api/app/getallowances', payload);
        console.log("API Response received:", JSON.stringify(response.data, null, 2)); // Log the received data

        // Check if the response contains valid data
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            const rowsWithId = response.data.map((row: any, index: number) => {
                const uniqueId = `${branchCode}-${row.allowanceDesc}-${index}`; // Use allowanceDesc for uniqueness
                return {
                    ...row,
                    id: uniqueId, 
                };
            });
            return rowsWithId as ReportFormData[];
        } else {
            console.log("No valid data returned for the given branch code.");
            return []; 
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        return [];
    }
};