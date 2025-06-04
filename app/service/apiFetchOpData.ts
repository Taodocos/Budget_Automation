import apiServices from '../ExportApi';

export interface ReportFormData {
    id: string; // Add id property
    estimated: string;
    actual: string;
    netincrement: string;
    projected: string;
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

// Define the interface for each row in the API response
export interface ApiResponseRow {
    branch_code: string;
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

export const fetchDataBackend = async (): Promise<ReportFormData[]> => {
    try {
        const response = await apiServices.get('/getformatdata');

        if (response.data && response.data.data) {
            const rowsWithId = response.data.data.map((row: ApiResponseRow, index: number) => ({
                ...row,
                id: row.branch_code ? `${row.branch_code}-${index}` : index.toString(),
            }));
            
            console.log('Fetched Data: ', rowsWithId);
            return rowsWithId as ReportFormData[];
        } else {
            console.error('No data found in the response');
            return []; 
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        return [];
    }
};