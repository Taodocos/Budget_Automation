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

export const fetchApprovedData = async (branchCode: string, districtCode: string): Promise<ReportFormData[]> => {
    try {
        const payload = { branch_code: branchCode, district_code: districtCode.split(','), status: 2 }; // Add status: 2
        console.log("Payload being sent to backend for approved data:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('/getformats_by_branch', payload);
        console.log("Original API Response for approved data:", response.data);

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
            console.log("No data returned for the approved status.");
            return []; 
        }
    } catch (err) {
        console.error('Error fetching approved data:', err);
        return []; 
    }
};