import apiServices from '../ExportApi';

export interface ReportFormData {
  id: string; 
  jobPosDesc: string;
  deptDesc: string; 
  additionalStaff: string;
  existingStaff: string;
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
  New: string,
 replacement :string
 jobPosId:string
}

// Define the interface for the API response
export interface ApiResponseData {
  branch_code: string;
  parentcode: string; // Ensure this matches the API response
  additionalStaff: string;
  existingStaff: string;
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
  deptDesc: string;
  New:string;
  replacement:string;
  jobPosId:string;
}

export const fetchDataBackend = async (branchCode: string): Promise<ReportFormData[]> => {
    try {
        const payload = { branch_code: branchCode };
        console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('/getManpowerBybranch', payload);
        console.log("Original API Response:", response.data);

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            const rowsWithId = response.data.map((row: ApiResponseData, index: number) => {
                const uniqueId = `${row.branch_code}-${row.parentcode}-${index}`;
                console.log("Generated Unique ID:", uniqueId);
                return {
                    ...row,
                    id: uniqueId,
                    JobPosId: row.jobPosId || "DefaultJobPosId", // Ensure JobPosId is included
                    deptDesc: row.deptDesc || "Default Description", // Set deptDesc with a fallback
                };
            });

            // Ensure the returned rows have the correct type
            return rowsWithId.map(row => ({
                id: row.id,
                jobPosId: row.JobPosId,
                deptDesc: row.deptDesc,
                additionalStaff: row.additionalStaff,
                existingStaff: row.existingStaff,
                branch_code: row.branch_code,
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
                New: row.New,
                replacement: row.replacement,
            })) as ReportFormData[];
        } else {
            console.log("No data returned for the given branch code.");
            return [];
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        return [];
    }
};