import apiServices from '../ExportApi';

export interface ReportFormData {
    id:string;
    Position:string;
    ClericalStaff:string;
    NonClericalStaff:string;
    ContractualStaff:string;
    OvertimeClerical:string;
    OvertimeNonClerical:string;
    SpecialDuty:string;
    FuelAllowance:string;
    RepresentationAllowance:string;
    HousingAllowance:string;
    AirTimeAllowance:string;
    PensionFund:string;
    CashIndemnity:string;
    DisturbanceAllowance:string;
    LivingHardship:string;
    ActingAllowance:string;
    MaternityPay:string;
    MedicalExpense:string;
    ResidentialRent:string;
    StaffInsurance:string;
    TrainingFee:string;
    AttireExpense:string;
    LeavePay:string;
    ReclassificationofCSEs:string;
    FuneralAllowance:string;
    StampDuty:string;
    CredentialAuthenticationFee:string
    GiftAwardReward:string;
    
}



// Updated function to include status
export const fetchDataBackend = async (
    branchCode: string,
    districtCode: string,
): Promise<ReportFormData[]> => {
    try {
        const payload = {
            branch_code: branchCode,
           // district_code: districtCode.split(','),
        };
        console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('/getallownces', payload);
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