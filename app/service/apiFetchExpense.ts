import apiServices from '../ExportApi';


export interface ReportFormData { 
  id: string; 
  branch_code: string;
  userId:string,
  expensesdesc:string,
  FiscalYear: string,
  TotalAmount: string,
}

export const fetchDataBackend = async (branchCode: string): Promise<ReportFormData[]> => {
    try {
        const payload = { branch_code: branchCode };
        console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('/getexpense', payload);
        console.log("API Response received:", JSON.stringify(response.data, null, 2)); 

        // Check if the response contains valid data
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            const rowsWithId = response.data.map((row: any, index: number) => {
                const uniqueId = `${branchCode}-${row.expensesdesc}-${index}`; 
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