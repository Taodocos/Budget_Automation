import apiServices from '../ExportApi';

export interface ReportFormData {
    
    branch_code: string;
    district_code: string;
    branch_name: string; 
   
}

export const fetchBranches = async (branchCode: string, districtCode: string): Promise<ReportFormData[]> => {
    try {
        const payload = { branch_code: branchCode, district_code: districtCode.split(',') };
        console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('/getbranch_access', payload);
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