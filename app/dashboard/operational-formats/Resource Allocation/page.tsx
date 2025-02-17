"use client";

import { sendDataBackend } from "@/app/service/apiAddResouceMobData";
import { useState } from "react";


interface DataRow {
  id: string;
  source: string;
  actualMarch: string;
  estimatedJune: string;
  netIncrementPlan: string;
  projectedJune: string;
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

interface FormData {
  actual: string;
  estimated: string;
  netincrement: string;
  projected: string;
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
  const [OutstandinLoan, setOutstandinLoan] = useState<DataRow[]>([
    {
      id: "1",
      source: "Short Term",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "2",
      source: "Medium Term",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "3",
      source: "Long term",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
  ]);

  const [OutstandingByType, setOutstandingByType] = useState<DataRow[]>([
    {
      id: "1",
      source: "Term Loans",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "2",
      source: "Overdrafts",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "3",
      source: "Merchandise/Reshipment",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
  ]);

  const [OutstandingByEco, setOutstandingByEco] = useState<DataRow[]>([
    {
      id: "1",
      source: "Agriculture",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "2",
      source: "Manufacturing",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "3",
      source: "Domestic Trade & Service",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "4",
      source: "	Export",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "5",
      source: "Import",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
        id: "6",
        source: "Hotel & Tourism",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "7",
        source: "Building & Construction",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
      },
      {
        id: "8",
        source: "Transport",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "9",
        source: "Consumer Loan",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "10",
        source: "Staff Mortgage & Automobile Loan",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
      },
      {
        id: "11",
        source: "Others",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
      },
  ]);

  const [Disbursement, setDisbursement] = useState<DataRow[]>([
    {
      id: "1",
      source: "Agriculture",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "2",
      source: "Manufacturing",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "3",
      source: "Domestic Trade & Service",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
        id: "4",
        source: "	Export",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "5",
        source: "Import",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "6",
        source: "Hotel & Tourism",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
      },
      {
        id: "7",
        source: "Building & Construction",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "8",
        source: "Transport",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "9",
        source: "Consumer Loan",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "10",
        source: "Staff Mortgage & Automobile Loan",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "11",
        source: "Others",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
  ]);

  const [Collection, setCollection] = useState<DataRow[]>([
    {
      id: "1",
      source: "Agriculture",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "2",
      source: "Manufacturing",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "3",
      source: "Domestic Trade & Service",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
        id: "4",
        source: "	Export",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "5",
        source: "Import",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
      },
      {
        id: "6",
        source: "Hotel & Tourism",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "7",
        source: "Building & Construction",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "8",
        source: "Transport",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
      },
      {
        id: "9",
        source: "Consumer Loan",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "10",
        source: "Staff Mortgage & Automobile Loan",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "11",
        source: "Others",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
  ]);


  
  const [CustomerAttraction, setCustomerAttraction] = useState<DataRow[]>([
    {
      id: "1",
      source: "Demand Deposit",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "2",
      source: "Saving Deposit",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
      id: "3",
      source: "Time deposit",
      actualMarch: "",
      estimatedJune: "",
      netIncrementPlan: "",
      projectedJune: "",
      Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
    },
    {
        id: "4",
        source: "	Interest Free Banking",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
    ]);

    
    const [DigitalBankingSubs, setDigitalBankingSubs] = useState<DataRow[]>([
      {
        id: "1",
        source: "Card Banking",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "2",
        source: "Mobile Application",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
      },
      {
        id: "3",
        source: "USSD",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "4",
        source: "QR-Code",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "5",
        source: "	Agent",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
      {
        id: "6",
        source: "POS",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
      Aug: "",
      Sep: "",
      Oct: "",
      Nov: "",
      Dec: "",
      Jan: "",
      Feb: "",
      Mar: "",
      Apr: "",
      May: "",
      Jun: "",
      },
      {
        id: "7",
        source: "Internet Banking",
        actualMarch: "",
        estimatedJune: "",
        netIncrementPlan: "",
        projectedJune: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
        Jan: "",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
      },
    ]);

  const handleInputChange = (id: string, field: keyof DataRow, value: string, 
    dataset:  "OutstandinLoan" | "OutstandingByType"|"OutstandingByEco"|"Disbursement"|"Collection"|"CustomerAttraction"|"DigitalBankingSubs") => {
    const setter = dataset === "OutstandinLoan" ? setOutstandinLoan : dataset === "OutstandingByType" ? setOutstandingByType :
    dataset === "OutstandingByEco" ? setOutstandingByEco: dataset === "Disbursement" ? setDisbursement: dataset === "Collection" ? setCollection:dataset === "CustomerAttraction" ? setCustomerAttraction : setDigitalBankingSubs;
    const updatedData = (dataset === "OutstandinLoan" ? OutstandinLoan : dataset === "OutstandingByType" ?OutstandingByType: dataset === "OutstandingByEco" ? 
    OutstandingByEco: dataset === "Disbursement" ?  Disbursement : dataset === "Collection" ? Collection:dataset === "CustomerAttraction" ? CustomerAttraction: DigitalBankingSubs ).map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setter(updatedData);
  };

  const formatData = (
    dataset: DataRow[],
    datasetKey: "OutstandinLoan" | "OutstandingByType" | "OutstandingByEco" | "Disbursement" | "Collection" | "CustomerAttraction" | "DigitalBankingSubs"
): FormData[] => {
    return dataset.map(row => ({
        actual: row.actualMarch,
        estimated: row.estimatedJune,
        netincrement: 
            (datasetKey === "OutstandinLoan" || 
             datasetKey === "OutstandingByType" || 
             datasetKey === "OutstandingByEco") 
            ? "0" 
            : row.netIncrementPlan.toString(), // Convert to string
        projected: row.projectedJune,
        parent_code: row.id.toString(),
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


  const renderTextBoxes = () => (
    <div className="mb-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="branch-name" className="block text-sm font-bold text-black">Branch Name:</label>
          <input
            type="text"
            id="branch-name"
            value="Your Branch Name" 
            readOnly
            className="w-full p-2 border rounded bg-gray-200"
          />
        </div>
        <div className="flex-1">
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
        </div>
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
          netIncrementPlan: (datasetKey === "OutstandingByEco" || 
                            datasetKey === "OutstandingByType" || 
                            datasetKey === "OutstandinLoan") 
                            ? 0 
                            : 0, // This can be adjusted based on your logic
          projectedJune: 0,
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
  
    
    
      dataset.forEach(row => {
        totals.actualMarch += Number(row.actualMarch) || 0;
        totals.estimatedJune += Number(row.estimatedJune) || 0;
    
        // Only sum netIncrementPlan for specific datasetKeys
        if (datasetKey !== "OutstandingByEco" && datasetKey !== "OutstandingByType" && datasetKey !== "OutstandinLoan") {
            totals.projectedJune += Number(row.netIncrementPlan) || 0;
        }
    
        totals.projectedJune += Number(row.projectedJune) || 0;
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

                        <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
        <th className="border p-2">Sources</th>
        <th className="border p-2">Actual March</th>
        <th className="border p-2">Estimated June</th>
        {datasetKey !== "OutstandingByEco" && datasetKey !== "OutstandingByType" && datasetKey !== "OutstandinLoan" && (
            <th className="border p-2">Net Increment Plan</th>
        )}
        <th className="border p-2">Projected Outstanding June</th>
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
                                                onChange={(e) => handleInputChange(row.id, "actualMarch", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.estimatedJune}
                                                onChange={(e) => handleInputChange(row.id, "estimatedJune", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.netIncrementPlan}
                                                onChange={(e) => handleInputChange(row.id, "netIncrementPlan", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.projectedJune}
                                                onChange={(e) => handleInputChange(row.id, "projectedJune", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Jul}
                                                onChange={(e) => handleInputChange(row.id, "Jul", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Aug}
                                                onChange={(e) => handleInputChange(row.id, "Aug", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Sep}
                                                onChange={(e) => handleInputChange(row.id, "Sep", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Oct}
                                                onChange={(e) => handleInputChange(row.id, "Oct", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                          <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Nov}
                                                onChange={(e) => handleInputChange(row.id, "Nov", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Dec}
                                                onChange={(e) => handleInputChange(row.id, "Dec", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Jan}
                                                onChange={(e) => handleInputChange(row.id, "Jan", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Feb}
                                                onChange={(e) => handleInputChange(row.id, "Feb", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Mar}
                                                onChange={(e) => handleInputChange(row.id, "Mar", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Apr}
                                                onChange={(e) => handleInputChange(row.id, "Apr", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.May}
                                                onChange={(e) => handleInputChange(row.id, "May", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <input
                                                type="text"
                                                value={row.Jun}
                                                onChange={(e) => handleInputChange(row.id, "Jun", e.target.value, datasetKey)}
                                                className="w-full p-1 border rounded"
                                            />
                                        </td>
                                        
                                    </tr>
                                ))}
                                <tr className="font-bold bg-black-200 text-black">
    <td className="border p-2">Total</td>
    <td className="border p-2">{totals.actualMarch}</td>
    <td className="border p-2">{totals.estimatedJune}</td>
    {(datasetKey !== "OutstandingByEco" && datasetKey !== "OutstandingByType" && datasetKey !== "OutstandinLoan") && (
        <td className="border p-2">{totals.netIncrementPlan}</td>
    )}
    <td className="border p-2">{totals.projectedJune}</td>
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
                                                    const formattedData: FormData[] = formatData(dataset, datasetKey);
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
        )};
                   
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