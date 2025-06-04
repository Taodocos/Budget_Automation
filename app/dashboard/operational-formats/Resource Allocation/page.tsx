"use client";

import { saveData } from "@/app/service/apiAddResMobRow";
import apiServices, { sendDataBackend } from "@/app/service/apiAddResouceMobData";
import { ReportFormData } from "@/app/service/apifetchResMon";
import { useCallback, useEffect, useState } from "react";
interface DataRow {
  id: string;
  source: string;
  actualMarch: string;
  estimatedJune: string;
  //netIncrementPlan: string;
  Jul: string;
  Aug: string;
  Sep: string;
  Oct: string;
  Nov: string;
  Dec: string;
  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  May: string;
  Jun: string;

}

interface ApiResponseItem {
  branch_code: string;
  parentcode: string;
  estimated: string;
  actual: string;

  status: string;
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

interface FormData {
  actual: string;
  estimated: string;
 // netincrement: string;
  parent_code: string;
  Jul: string;
  Aug: string;
  Sep: string;
  Oct: string;
  Nov: string;
  Dec: string;
  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  May: string;
  Jun: string;

}

const ResourceAlloccation = () => {

  
  const [branchCode, setBranchCode] = useState<string | null>(null);
   const [branchName, setBranchName] = useState<string | null>(null);
  // const [region, setRegion] = useState<string | null>(null);
  const [districtcode, setDistrictCode] = useState<string | null>(null);


  
useEffect(() => {
  
      const storedBranchCode = sessionStorage.getItem("branch_code");
       const storedBranchName= sessionStorage.getItem("branch_name");
      // const storedRegion= sessionStorage.getItem("region");
      const storedDistrict= sessionStorage.getItem("district_code");
      setBranchCode(storedBranchCode);
      setBranchName(storedBranchName);
      // setRegion(storedRegion);
      setDistrictCode(storedDistrict);
  }, []);




 



  const [OutstandinLoan, setOutstandinLoan] = useState<DataRow[]>([//7
    {
      id: "31",
      source: "Short Term",
      actualMarch: "0",
        estimatedJune: "0",
       // netIncrementPlan: "0",
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
    },
    {
      id: "32",
      source: "Medium Term",
      actualMarch: "0",
        estimatedJune: "0",
        //netIncrementPlan: "0",
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
    },
    {
      id: "33",
      source: "Long term",
      actualMarch: "0",
        estimatedJune: "0",
        //netIncrementPlan: "0",
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
    },
  ]);

  const [OutstandingByType, setOutstandingByType] = useState<DataRow[]>([//12
    {
      id: "34",
      source: "Term Loans",
      actualMarch: "0",
        estimatedJune: "0",
        //netIncrementPlan: "0",
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
    },
    {
      id: "35",
      source: "Overdrafts",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "36",
      source: "Merchandise/Reshipment",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
  ]);

  const [OutstandingByEco, setOutstandingByEco] = useState<DataRow[]>([//13
    {
      id: "37",
      source: "Agriculture",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "38",
      source: "Manufacturing",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "39",
      source: "Domestic Trade & Service",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "40",
      source: "	Export",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "41",
      source: "Import",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
        id: "42",
        source: "Hotel & Tourism",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "43",
        source: "Building & Construction",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "44",
        source: "Transport",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "45",
        source: "Consumer Loan",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "46",
        source: "Staff Mortgage & Automobile Loan",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "47",
        source: "Others",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
  ]);

  const [Disbursement, setDisbursement] = useState<DataRow[]>([//14
    {
      id: "48",
      source: "Agriculture",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "49",
      source: "Manufacturing",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "50",
      source: "Domestic Trade & Service",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
        id: "51",
        source: "	Export",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "52",
        source: "Import",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "53",
        source: "Hotel & Tourism",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "54",
        source: "Building & Construction",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "55",
        source: "Transport",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "56",
        source: "Consumer Loan",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "57",
        source: "Staff Mortgage & Automobile Loan",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "58",
        source: "Others",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
  ]);

  const [Collection, setCollection] = useState<DataRow[]>([//15
    {
      id: "59",
      source: "Agriculture",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "60",
      source: "Manufacturing",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "61",
      source: "Domestic Trade & Service",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
        id: "62",
        source: "	Export",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "63",
        source: "Import",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "64",
        source: "Hotel & Tourism",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "65",
        source: "Building & Construction",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "66",
        source: "Transport",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "67",
        source: "Consumer Loan",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "68",
        source: "Staff Mortgage & Automobile Loan",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "69",
        source: "Others",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
  ]);


  
  const [CustomerAttraction, setCustomerAttraction] = useState<DataRow[]>([//16
    {
      id: "70",
      source: "Demand Deposit",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "71",
      source: "Saving Deposit",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
      id: "72",
      source: "Time deposit",
      actualMarch: "0",
      estimatedJune: "0",
    
      Jul: "0",
      Aug: "0",
      Sep: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",
      Jun: "0",
    },
    {
        id: "73",
        source: "	Interest Free Banking",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
    ]);

    
    const [DigitalBankingSubs, setDigitalBankingSubs] = useState<DataRow[]>([//17
      {
        id: "74",
        source: "Card Banking",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "75",
        source: "Mobile Application",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "575",
        source: "USSD",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "76",
        source: "QR-Code",
        actualMarch: "0",
        estimatedJune: "0",
      
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "77",
        source: "	Agent",
        actualMarch: "0",
        estimatedJune: "0",
        //netIncrementPlan: "0",
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "78",
        source: "POS",
        actualMarch: "0",
        estimatedJune: "0",
       // netIncrementPlan: "0",
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
      {
        id: "79",
        source: "Internet Banking",
        actualMarch: "0",
        estimatedJune: "0",
       // netIncrementPlan: "0",
        Jul: "0",
        Aug: "0",
        Sep: "0",
        Oct: "0",
        Nov: "0",
        Dec: "0",
        Jan: "0",
        Feb: "0",
        Mar: "0",
        Apr: "0",
        May: "0",
        Jun: "0",
      },
    ]);

    useEffect(() => {
      const parentCodes = {
        OutstandinLoan: "7",
        OutstandingByType: "12",
        OutstandingByEco: "13",
        Disbursement: "14",
        Collection: "15",
        CustomerAttraction: "16",
        DigitalBankingSubs: "17",
      };
  
      setOutstandinLoan(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.OutstandinLoan,
      })));
  
      setOutstandingByType(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.OutstandingByType,
      })));
  
      setOutstandingByEco(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.OutstandingByEco,
      })));
  
      setDisbursement(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.Disbursement,
      })));
  
      setCollection(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.Collection,
      })));
  
      setCustomerAttraction(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.CustomerAttraction,
      })));
  
      setDigitalBankingSubs(prevData => prevData.map(row => ({
        ...row,
        parent_code: parentCodes.DigitalBankingSubs,
      })));
    }, []); // Empty dependency array to run once on mount
  
   
  
  
  
  
    const fetchData = useCallback(async () => {
      if (!branchCode) return;
  
      try {
          const sections = [
              { key: "OutstandinLoan", code: "7" },
              { key: "OutstandingByType", code: "12" },
              { key: "OutstandingByEco", code: "13" },
              { key: "Disbursement", code: "14" },
              { key: "Collection", code: "15" },
              { key: "CustomerAttraction", code: "16" },
              { key: "DigitalBankingSubs", code: "17" },
          ];
  
          for (const section of sections) {
              const response = await apiServices.post('/get_bybranch_parentcode', {
                  branch_code: branchCode,
                  parent_code: section.code,
              });
  
              if (response.status === 200) {
                  console.log("Fetched data for", section.key, response.data); // Debugging line
                  const fetchedData: ApiResponseItem[] = response.data.data || [];
                  const mappedData: DataRow[] = fetchedData.map((item) => ({
                    id: item.parentcode,
                    source: item.description,
                    actualMarch: item.actual,
                    estimatedJune: item.estimated,
                   
                    Jul: item.jul,
                    Aug: item.aug,
                    Sep: item.sep,
                    Oct: item.oct,
                    Nov: item.nov,
                    Dec: item.dec,
                    Jan: item.jan,
                    Feb: item.feb,
                    Mar: item.mar,
                    Apr: item.apr,
                    May: item.may,
                    Jun: item.jun,
                    parent_code: item.parentcode,
                  }));
  
                  switch (section.key) {
                      case "OutstandinLoan":
                          setOutstandinLoan(mappedData);
                          break;
                      case "OutstandingByType":
                          setOutstandingByType(mappedData);
                          break;
                      case "OutstandingByEco":
                          setOutstandingByEco(mappedData);
                          break;
                      case "Disbursement":
                          setDisbursement(mappedData);
                          break;
                      case "Collection":
                          setCollection(mappedData);
                          break;
                      case "CustomerAttraction":
                          setCustomerAttraction(mappedData);
                          break;
                      case "DigitalBankingSubs":
                          setDigitalBankingSubs(mappedData);
                          break;
                      default:
                          console.warn(`Unknown section key: ${section.key}`);
                  }
              } else {
                  console.warn(`No data found for ${section.key}`);
              }
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }, [branchCode]);
  
  useEffect(() => {
      fetchData();
  }, [fetchData]);

  const handleInputChange = (
    id: string,
    field: keyof DataRow,
    value: string,
    dataset: DataRow[] // Pass the relevant dataset directly
  ) => {
    const updatedData = dataset.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
  
    // Use the appropriate setter based on the dataset passed
    if (dataset === OutstandinLoan) {
      setOutstandinLoan(updatedData);
    } else if (dataset === OutstandingByType) {
      setOutstandingByType(updatedData);
    } else if (dataset === OutstandingByEco) {
      setOutstandingByEco(updatedData);
    } else if (dataset === Disbursement) {
      setDisbursement(updatedData);
    } else if (dataset === Collection) {
      setCollection(updatedData);
    } else if (dataset === CustomerAttraction) {
      setCustomerAttraction(updatedData);
    } else if (dataset === DigitalBankingSubs) {
      setDigitalBankingSubs(updatedData);
    }
  };




  
  const formatData = (dataset: DataRow[]): FormData[] => {
    return dataset.map(row => ({
        actual: row.actualMarch,
        estimated: row.estimatedJune,
        parent_code: row.id.toString(),
        branch_code: branchCode,
        district_code:districtcode,
        Jul: row.Jul,
        Aug: row.Aug,
        Sep: row.Sep,
        Oct: row.Oct,
        Nov: row.Nov,
        Dec: row.Dec,
        Jan: row.Jan,
        Feb: row.Feb,
        Mar: row.Mar,
        Apr: row.Apr,
        May: row.May,
        Jun: row.Jun,
    }));
};
const formatDataForRowSave = (row: DataRow): ReportFormData => ({
  id: row.id, // Ensure this is included
  actual: row.actualMarch,
  estimated: row.estimatedJune,
  parentcode: row.id, // Correct mapping for parent code
  branch_code: branchCode!, // Ensure branch code is not null
  district_code: districtcode!, // Ensure district code is not null
  jul: row.Jul,
  aug: row.Aug,
  sep: row.Sep,
  oct: row.Oct,
  nov: row.Nov,
  dec: row.Dec,
  jan: row.Jan,
  feb: row.Feb,
  mar: row.Mar,
  apr: row.Apr,
  may: row.May,
  jun: row.Jun,
  status: "",
  description: ""
});




const saveRow = async (row: DataRow) => {
  const formattedRowData = formatDataForRowSave(row);
  try {
      await saveData(formattedRowData); // Call your API to save the row data
     // alert("Row saved successfully");
  } catch (error) {
      console.error("Failed to save row data:", error);
      //alert("Save failed: " + error.message); // Display the error message
  }
};

  const renderTextBoxes = () => (
    <div className="mb-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="branch-name" className="block text-sm font-bold text-black">Branch Name:</label>
          <input type="text" id="branch-name" value={branchName ?? ""} readOnly className="w-full p-2 border font-bold text-black rounded bg-gray-200" />
        </div>
        {/* <div className="flex-1">
          <label htmlFor="district" className="block text-sm font-bold text-black">District:</label>
          <input
            type="text"
            id="district"
            value="Your District" 
            readOnly
            className="w-full p-2 border rounded bg-gray-200"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="region" className="block text-sm font-bold text-black">Region:</label>
          <input
            type="text"
            id="region"
            value="Your Region" 
            readOnly
            className="w-full p-2 border rounded bg-gray-200"
          />
        </div> */}
      </div>
    </div>
  );




  const [expandedGrids, setExpandedGrids] = useState<Set<string>>(new Set());
  const toggleGrid = (gridName: string) => {
      const newExpandedGrids = new Set(expandedGrids);
      if (newExpandedGrids.has(gridName)) {
        newExpandedGrids.delete(gridName);
      } else {
        newExpandedGrids.add(gridName);
      }
      setExpandedGrids(newExpandedGrids);
    };
  



    const renderTable = (
      heading: string, 
      dataset: DataRow[], 
      datasetKey: "OutstandinLoan" | "OutstandingByType" | "OutstandingByEco" | "Disbursement" | "Collection" | "CustomerAttraction" | "DigitalBankingSubs"
  ) => {
      const totals = {
          actualMarch: 0,
          estimatedJune: 0,
          Jan: 0,
          Feb: 0,
          Mar: 0,
          Apr: 0,
          May: 0,
          Jun: 0,
          Jul: 0,
          Aug: 0,
          Sep: 0,
          Oct: 0,
          Nov: 0,
          Dec: 0,
      };
  
      // Additional logic to calculate totals from the dataset would go here...
  
      console.log("Rendering table for:", heading, "with dataset key:", datasetKey);
    
    
      dataset.forEach(row => {
        totals.actualMarch += Number(row.actualMarch) || 0;
        totals.estimatedJune += Number(row.estimatedJune) || 0;
        totals.Jul += Number(row.Jul) || 0;
        totals.Aug += Number(row.Aug) || 0;
        totals.Sep += Number(row.Sep) || 0;
        totals.Oct += Number(row.Oct) || 0;
        totals.Nov += Number(row.Nov) || 0;
        totals.Dec += Number(row.Dec) || 0;
        totals.Jan += Number(row.Jan) || 0;
        totals.Feb += Number(row.Feb) || 0;
        totals.Mar += Number(row.Mar) || 0;
        totals.Apr += Number(row.Apr) || 0;
        totals.May += Number(row.May) || 0;
        totals.Jun += Number(row.Jun) || 0;
    });
        return (



            <div className="mb-8">
        <h2
          className="font-bold text-xl mb-2 text-black cursor-pointer"
          onClick={() => toggleGrid(heading)}
        >
          {expandedGrids.has(heading) ? "−" : "+"} {heading}
        </h2>
        {expandedGrids.has(heading) && (
          <div className="bg-white shadow-md rounded p-4">
               <div className="overflow-x-auto">

                        <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
        <th className="border p-2">Sources</th>
        <th className="border p-2">Actual March</th>
        <th className="border p-2">Estimated June</th>
        <th className="border p-2">Jul</th>
        <th className="border p-2">Aug</th>
        <th className="border p-2">Sep</th>
        <th className="border p-2">Oct</th>
        <th className="border p-2">Nov</th>
        <th className="border p-2">Dec</th>
        <th className="border p-2">Jan</th>
        <th className="border p-2">Feb</th>
        <th className="border p-2">Mar</th>
        <th className="border p-2">Apr</th>
        <th className="border p-2">May</th>
        <th className="border p-2">Jun</th>
        <th className="border p-2">Action</th>
    </tr>
</thead>
<tbody>
  {dataset.map((row) => (
    <tr key={row.id} className="text-sm text-gray-700">
      <td className="border p-2">{row.source}</td>
      <td className="border p-2">
        <input
          type="text"
          value={row.actualMarch}
          onChange={(e) => handleInputChange(row.id, "actualMarch", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.estimatedJune}
          onChange={(e) => handleInputChange(row.id, "estimatedJune", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Jul}
          onChange={(e) => handleInputChange(row.id, "Jul", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Aug}
          onChange={(e) => handleInputChange(row.id, "Aug", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Sep}
          onChange={(e) => handleInputChange(row.id, "Sep", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Oct}
          onChange={(e) => handleInputChange(row.id, "Oct", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Nov}
          onChange={(e) => handleInputChange(row.id, "Nov", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Dec}
          onChange={(e) => handleInputChange(row.id, "Dec", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Jan}
          onChange={(e) => handleInputChange(row.id, "Jan", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Feb}
          onChange={(e) => handleInputChange(row.id, "Feb", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Mar}
          onChange={(e) => handleInputChange(row.id, "Mar", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Apr}
          onChange={(e) => handleInputChange(row.id, "Apr", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.May}
          onChange={(e) => handleInputChange(row.id, "May", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          value={row.Jun}
          onChange={(e) => handleInputChange(row.id, "Jun", e.target.value, dataset)}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border p-2">
        <button
          onClick={() => saveRow(row)} // Call the saveRow function with the current row
          className="bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
      </td>
                                    </tr>
                                ))}
                                <tr className="font-bold bg-black-200 text-black">
    <td className="border p-2">Total</td>
    <td className="border p-2">{totals.actualMarch}</td>
    <td className="border p-2">{totals.estimatedJune}</td>
    <td className="border p-2">{totals.Jul}</td>
    <td className="border p-2">{totals.Aug}</td>
    <td className="border p-2">{totals.Sep}</td>
    <td className="border p-2">{totals.Oct}</td>
    <td className="border p-2">{totals.Nov}</td>
    <td className="border p-2">{totals.Dec}</td>
    <td className="border p-2">{totals.Jan}</td>
    <td className="border p-2">{totals.Feb}</td>
    <td className="border p-2">{totals.Mar}</td>
    <td className="border p-2">{totals.Apr}</td>
    <td className="border p-2">{totals.May}</td>
    <td className="border p-2">{totals.Jun}</td>
</tr>
                            </tbody>
                        </table>

                        <div className="mt-4">
                       
                        <button
                                                onClick={async () => {
                                                    const formattedData: FormData[] = formatData(dataset);
                                                    console.log("Transformed Data to be sent:", formattedData);
                                                    try {
                                                        const responseData = await sendDataBackend(formattedData);
                                                        setOutstandinLoan((prevData) => 
                                                            prevData.map((row) => 
                                                                responseData.find((res) => res.parent_code === row.id) || row
                                                            )
                                                        );
                                                    } catch (error) {
                                                        console.error(`Failed to submit data for ${heading}`, error);
                                                        window.alert(`Failed to submit data for ${heading}`);
                                                    }
                                                }}
                                                className="bg-blue-500 text-white p-2 rounded"
                                            >
                                                Submit
                                            </button>

                       </div>

                       
                    </div>
                    </div>
        )}
                   
                </div>
            
        );
    };

  return (
    <div className="p-6 bg-black-100 h-screen overflow-y-auto">
      
      {renderTextBoxes()}
      {renderTable("Outstanding Loans and Advances by Maturity", OutstandinLoan, "OutstandinLoan")}
      {renderTable("Outstanding loans and advances by Type", OutstandingByType, "OutstandingByType")}
      {renderTable("Outstanding by Economic Sector", OutstandingByEco, "OutstandingByEco")}
      {renderTable("Disbursement", Disbursement, "Disbursement")} 
      {renderTable("Collection", Collection, "Collection")}
      {renderTable("CustomerAttraction", CustomerAttraction, "CustomerAttraction")} 
      {renderTable("DigitalBankingSubs", DigitalBankingSubs, "DigitalBankingSubs")}
    </div>
  );
};

export default ResourceAlloccation;