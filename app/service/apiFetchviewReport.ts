import apiServices from '../ExportApi';

export interface ReportFormData {
    description: string;
    estimated: string;
    actual: string;
    netincrement: string;
    projected: string;
    parentcode:string;
    branchCode:string;
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
    item: string;  
    quantity: string;  
    unitPrice: string;  
    totalBudget?: string;  
    quarter: string;  
    new: string;  
    replacement: string;  
}

// Updated function to include status
export const fetchDataBackend = async (
    branchCode: string,
    districtCode: string,
    status?: string // Optional status parameter
): Promise<ReportFormData[]> => {
    try {
        const payload = {
            branch_code: branchCode,
            district_code: districtCode.split(','),
            status: status // Include status in the payload
        };
        console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('/getformats_by_branch', payload);
        console.log("Original API Response:", response.data);

        if (response.data && response.data.data) { 
            const rowsWithId = response.data.data.map((row: any, index: number) => {
                const uniqueId = `${row.branch_code}-${row.parentcode}-${index}`;
                console.log("Generated Unique ID:", uniqueId);
                return {
                    ...row,
                    id: uniqueId,
                    parentcode: row.parentcode
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