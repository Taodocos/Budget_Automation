import axios from "axios";
import apiServices from "../ExportApi";

export type FormSubmissionData = {
    Position: string;
    ClericalStaff: string;
    NonClericalStaff: string;
    ContractualStaff: string;
    OvertimeClerical: string;
    OvertimeNonClerical: string;
    SpecialDuty: string;
    FuelAllowance: string;
    RepresentationAllowance: string;
    HousingAllowance: string;
    AirTimeAllowance: string;
    PensionFund: string;
    CashIndemnity: string;
    DisturbanceAllowance: string;
    LivingHardship: string;
    ActingAllowance: string;
    MaternityPay: string;
    MedicalExpense: string;
    ResidentialRent: string;
    StaffInsurance: string;
    TrainingFee: string;
    AttireExpense: string;
    LeavePay: string;
    ReclassificationofCSEs: string;
    FuneralAllowance: string;
    StampDuty: string;
    CredentialAuthenticationFee: string;
    GiftAwardReward: string;
};

export type DataRow = {
    id: string;
    Position: string;
    ClericalStaff: string;
    NonClericalStaff: string;
    ContractualStaff: string;
    OvertimeClerical: string;
    OvertimeNonClerical: string;
    SpecialDuty: string;
    FuelAllowance: string;
    RepresentationAllowance: string;
    HousingAllowance: string;
    AirTimeAllowance: string;
    PensionFund: string;
    CashIndemnity: string;
    DisturbanceAllowance: string;
    LivingHardship: string;
    ActingAllowance: string;
    MaternityPay: string;
    MedicalExpense: string;
    ResidentialRent: string;
    StaffInsurance: string;
    TrainingFee: string;
    AttireExpense: string;
    LeavePay: string;
    ReclassificationofCSEs: string;
    FuneralAllowance: string;
    StampDuty: string;
    CredentialAuthenticationFee: string;
    GiftAwardReward: string;
};

// Update trimData to handle only string fields
const trimData = (data: FormSubmissionData): FormSubmissionData => {
    return {
        ...data,
        Position: data.Position.trim(),
        ClericalStaff: data.ClericalStaff.trim(),
        NonClericalStaff: data.NonClericalStaff.trim(),
        ContractualStaff: data.ContractualStaff.trim(),
        OvertimeClerical: data.OvertimeClerical.trim(),
        OvertimeNonClerical: data.OvertimeNonClerical.trim(),
        SpecialDuty: data.SpecialDuty.trim(),
        FuelAllowance: data.FuelAllowance.trim(),
        RepresentationAllowance: data.RepresentationAllowance.trim(),
        HousingAllowance: data.HousingAllowance.trim(),
        AirTimeAllowance: data.AirTimeAllowance.trim(),
        PensionFund: data.PensionFund.trim(),
        CashIndemnity: data.CashIndemnity.trim(),
        DisturbanceAllowance: data.DisturbanceAllowance.trim(),
        LivingHardship: data.LivingHardship.trim(),
        ActingAllowance: data.ActingAllowance.trim(),
        MaternityPay: data.MaternityPay.trim(),
        MedicalExpense: data.MedicalExpense.trim(),
        ResidentialRent: data.ResidentialRent.trim(),
        StaffInsurance: data.StaffInsurance.trim(),
        TrainingFee: data.TrainingFee.trim(),
        AttireExpense: data.AttireExpense.trim(),
        LeavePay: data.LeavePay.trim(),
        ReclassificationofCSEs: data.ReclassificationofCSEs.trim(),
        FuneralAllowance: data.FuneralAllowance.trim(),
        StampDuty: data.StampDuty.trim(),
        CredentialAuthenticationFee: data.CredentialAuthenticationFee.trim(),
        GiftAwardReward: data.GiftAwardReward.trim(),
    };
};

export const sendDataBackend = async (data: FormSubmissionData[]): Promise<DataRow[]> => {
    try {
        const trimmedData = data.map(trimData);
        console.log("Transformed Data to be sent:", trimmedData);
        
        const response = await apiServices.post("/addformdata", trimmedData);
        console.log("Response data:", response.data);
        window.alert(`Data submitted successfully`);
        
        return response.data; 
    } catch (err) {
        console.error("Error sending data:", err);
        
        if (axios.isAxiosError(err)) {
            if (err.response) {
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
                window.alert(`Error: ${err.response.data.message || "Unknown error"}`);
            } else {
                console.error("Error message:", err.message);
            }
        } else {
            console.error("Unexpected error:", err);
        }
        
        return []; 
    }
};

export default apiServices;