"use client";

import { useCallback, useEffect, useState } from "react";

import apiServices, { sendDataBackend, FormData } from "@/app/service/apiAddResouceMobData";
import { fetchSourcesById } from "@/app/service/apifetchIncomeSup";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { saveData } from "@/app/service/apiAddResMobRow";

//import ManPower from "../../ManPowerReq/page";


export interface ReportFormData { 
  id: string; 
  actual: string; 
  estimated: string; 
  projected: string; 
  parentcode: string; 
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
  branch_code: string; 
  district_code: string;
  status: string;      
  description: string;  
}


interface SourceItem {
  description: string;
  parent_code: string;
}

interface DataRow {
  id: string;
  source: string;
  actualMarch: string;
  estimatedJune: string;
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

interface ExpenditureData {
  source:string;
  id: string;
  description: string;  // Description of the item
  estimated: string;    // Estimated value
  actual: string;       // Actual value
 parent_code:string;
  projected: string;    // Projected value
  jul: string;          // Monthly values
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

const ExpenseTemplate = () => {
  
  //const router = useRouter();
  const [branchCode, setBranchCode] = useState<string>("");
  const [InterestExpense, setInterestExpense] = useState<DataRow[]>([]);
  const [SalaryBenefit, setSalaryBenefit] = useState<DataRow[]>([]);
  const [GeneralExpense, setGeneralExpense] = useState<DataRow[]>([]);
  const [ControllableExpensesHQ, setControllableExpensesHQ] = useState<DataRow[]>([]);
  const [ControllableExpensesBranches, setControllableExpensesBranches] = useState<DataRow[]>([]);
  const [ExpenditureGridData, setExpenditureGridData] = useState<ExpenditureData[]>([]);
  const [editParentCode, setEditParentCode] = useState<number | null>(null);
  const [gridData] = useState<ExpenditureData[]>([]);
  const [InterestSources, setInterestSources] = useState<SourceItem[]>([]);
  const [GeneralExpenseSources, setGeneralExpenseSources] = useState<SourceItem[]>([]);
  const [ControllableExpensesHQSources, setControllableExpensesHQSources] = useState<SourceItem[]>([]);
  const [ControllableExpensesBranchesSources, setControllableExpensesBranchesSources] = useState<SourceItem[]>([]);
  const [expandedGrids, setExpandedGrids] = useState<Set<string>>(new Set());
  const [searchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const rowsPerPage = 7; 
  useEffect(() => {
    const storedBranchCode = sessionStorage.getItem("branch_code");
    setBranchCode(storedBranchCode || ""); // Default to empty string if null
}, []);
  const ExpenditureGridDataData = async (selectedBranchCode: string) => {
    try {
        const payload = { branch_code: selectedBranchCode, };
        console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));

        const response = await apiServices.post('/getexpensebybranch', payload); // Change to POST
        const data = response.data; // Assuming response.data contains the data you need
        console.log("Fetched expenditure Data:", data);
        setExpenditureGridData(data.length > 0 ? data : []);
    } catch (error) {
        console.error("Error fetching additional grid data:", error);
    }
};

useEffect(() => {
  if (branchCode) {
    console.log("Fetching data for branch code:", branchCode);
    ExpenditureGridDataData(branchCode);
  }
}, [branchCode]);




const handleInputChange = (index: number, field: keyof ExpenditureData, value: string) => {
  setExpenditureGridData((prevData) =>
      prevData.map((row, i) =>
          i === index ? { ...row, [field]: value } : row
      )
  );
};
const handleEdit = (index: number) => {
  setEditParentCode(index);
};

const handleSave = async (index: number) => {
  const rowToSave = ExpenditureGridData[index];
  if (rowToSave) {
      try {
          if (!branchCode) {
              alert("Branch code is required.");
              return;
          }

          const dataToSave: ReportFormData = {
              id: rowToSave.id || "", 
              actual: rowToSave.actual,
              estimated: rowToSave.estimated,
              projected: rowToSave.projected,
              parentcode: rowToSave.parent_code,
              jul: rowToSave.jul,
              aug: rowToSave.aug,
              sep: rowToSave.sep,
              oct: rowToSave.oct,
              nov: rowToSave.nov,
              dec: rowToSave.dec,
              jan: rowToSave.jan,
              feb: rowToSave.feb,
              mar: rowToSave.mar,
              apr: rowToSave.apr,
              may: rowToSave.may,
              jun: rowToSave.jun,
              branch_code: branchCode,
              district_code: "", 
              status: "",       
              description: rowToSave.description || "", 
          };

          await saveData(dataToSave);
          
      } catch (error) {
          console.error('Error saving changes:', error);
          alert('Failed to save changes.');
      }
  }
  setEditParentCode(null); // Reset edit state
};


  const fetchSources = async (id: string) => {
    try {
      const data = await fetchSourcesById(id);
      if (data && data.length > 0) {
        return data.map((item: { itemCode: string; itemName: string }) => ({
          parent_code: item.itemCode,
          description: item.itemName,
        }));
      } else {
        console.warn("No sources found for ID:", id);
        return [];
      }
    } catch (error) {
      console.error("Error fetching sources:", error);
      return [];
    }
  };
  const fetchAllSources = useCallback(async () => {
    if (expandedGrids.has("InterestExpense")) {
      setInterestSources(await fetchSources("85"));
    }
    // if (expandedGrids.has("SalaryBenefit")) {
    //   setSalaryBenefitSources(await fetchSources("86"));
    // }
    if (expandedGrids.has("GeneralExpense")) {
      setGeneralExpenseSources(await fetchSources("87"));
    }
    if (expandedGrids.has("ControllableExpensesHQ")) {
      setControllableExpensesHQSources(await fetchSources("88"));
    }
    if (expandedGrids.has("ControllableExpensesBranches")) {
      setControllableExpensesBranchesSources(await fetchSources("89"));
    }
  }, [expandedGrids]);

  useEffect(() => {
    fetchAllSources();
  }, [fetchAllSources]); // Include fetchAllSources in the dependency array

  const toggleGrid = (heading: string) => {
    const newSet = new Set(expandedGrids);
    if (newSet.has(heading)) {
      newSet.delete(heading);
    } else {
      newSet.add(heading);
    }
    setExpandedGrids(newSet);
  };
  const filteredData = gridData.filter(row =>
    row.source.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleNextPage = () => {
  if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
  }
};

const handlePreviousPage = () => {
  if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
  }
};


const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  

  const handleInputChangeM = (
    type: string,
    id: string,
    field: keyof DataRow,
    value: string
  ) => {
    const updatedData = (type === "InterestExpense"
      ? InterestExpense
      // : type === "SalaryBenefit"
      // ? SalaryBenefit
      : type === "GeneralExpense"
      ? GeneralExpense
      : type === "ControllableExpensesHQ"
      ? ControllableExpensesHQ
      : ControllableExpensesBranches).map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );

    if (type === "InterestExpense") setInterestExpense(updatedData);
    // if (type === "SalaryBenefit") setSalaryBenefit(updatedData);
    if (type === "GeneralExpense") setGeneralExpense(updatedData);
    if (type === "ControllableExpensesHQ") setControllableExpensesHQ(updatedData);
    if (type === "ControllableExpensesBranches") setControllableExpensesBranches(updatedData);
  };

  const formatData = (dataset: DataRow[]): FormData[] => {
    return dataset.map(row => ({
      actual: row.actualMarch,
      estimated: row.estimatedJune,
      projected: row.projectedJune,
      parent_code: row.source,
      branch_code: branchCode,
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

  const handleAddRow = (type: string) => {
    const newRow: DataRow = {
      id: (Math.random() * 1000).toString(),
      source: "",
      actualMarch: "0",
      estimatedJune: "0",
      projectedJune: "0",
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
    };

    if (type === "InterestExpense") {
      setInterestExpense([...InterestExpense, newRow]);
    } else if (type === "SalaryBenefit") {
      setSalaryBenefit([...SalaryBenefit, newRow]);
    } else if (type === "GeneralExpense") {
      setGeneralExpense([...GeneralExpense, newRow]);
    } else if (type === "ControllableExpensesHQ") {
      setControllableExpensesHQ([...ControllableExpensesHQ, newRow]);
    } else {
      setControllableExpensesBranches([...ControllableExpensesBranches, newRow]);
    }
  };

  const handleDeleteRow = (type: string, id: string) => {
    const updatedData = (type === "InterestExpense"
      ? InterestExpense
      : type === "SalaryBenefit"
      ? SalaryBenefit
      : type === "GeneralExpense"
      ? GeneralExpense
      : type === "ControllableExpensesHQ"
      ? ControllableExpensesHQ
      : ControllableExpensesBranches).filter((row) => row.id !== id);

    if (type === "InterestExpense") setInterestExpense(updatedData);
    if (type === "SalaryBenefit") setSalaryBenefit(updatedData);
    if (type === "GeneralExpense") setGeneralExpense(updatedData);
    if (type === "ControllableExpensesHQ") setControllableExpensesHQ(updatedData);
    if (type === "ControllableExpensesBranches") setControllableExpensesBranches(updatedData);
  };

  const handleSubmit = async (type: string) => {
    const dataset = type === "InterestExpense"
      ? InterestExpense
      : type === "SalaryBenefit"
      ? SalaryBenefit
      : type === "GeneralExpense"
      ? GeneralExpense
      : type === "ControllableExpensesHQ"
      ? ControllableExpensesHQ
      : ControllableExpensesBranches;

    const formattedData = formatData(dataset);
    
    try {
      await sendDataBackend(formattedData);
   
      // Optionally: Redirect to another page or reset state
    } catch (error) {
      console.error(`Failed to submit data for ${type}`, error);
      alert(`Failed to submit data for ${type}`);
    }
  };

  const renderTable = (type: string, data: DataRow[], sources: SourceItem[]) => (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2
        className="font-bold text-xl mb-2 text-black cursor-pointer"
        onClick={() => toggleGrid(type)}
      >
        {expandedGrids.has(type) ? "−" : "+"} {type.replace(/([A-Z])/g, ' $1')}
      </h2>
      {expandedGrids.has(type) && (
        <div>
          <div className="flex justify-end items-center mb-2">
            <button
              onClick={() => handleAddRow(type)}
              className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow"
            >
              + Add 
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                  <th className="border p-2">Sources</th>
                  <th className="border p-2">Actual March</th>
                  <th className="border p-2">Estimated June</th>
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
        <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="text-sm text-gray-700">
                    <td className="border p-2">
                    <select
                        value={row.source}
                        onChange={(e) =>
                          handleInputChangeM(type, row.id, "source", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      >
                        <option value="">Select</option>
                        {sources.map((source) => (
                          <option key={source.parent_code} value={source.parent_code}>
                            {source.description}
                          </option>
                        ))}
                      </select>
                    </td>
                    {Object.keys(row)
                      .filter((field) => field !== "id" && field !== "source")
                      .map((field) => (
                        <td key={field} className="border p-2">
                          <input
                            type="text"
                            value={row[field as keyof DataRow]}
                            onChange={(e) =>
                              handleInputChangeM(type, row.id, field as keyof DataRow, e.target.value)
                            }
                            className="w-full p-1 border rounded"
                          />
                        </td>
                      ))}
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDeleteRow(type, row.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleSubmit(type)}
              className="text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] px-4 py-2 rounded shadow"
            >
              Submit 
            </button>
          </div>
        </div>
      )}
 
    </div>
  );

  return (
    <div>


    <div className="p-6 bg-gray-100 h-screen overflow-y-auto">
      {renderTable("InterestExpense", InterestExpense,InterestSources)} 
      {renderTable("GeneralExpense", GeneralExpense,GeneralExpenseSources)} 
      {renderTable("ControllableExpensesHQ", ControllableExpensesHQ,ControllableExpensesHQSources)} 
      {renderTable("ControllableExpensesBranches", ControllableExpensesBranches,ControllableExpensesBranchesSources)} 
       <table className="w-full table-auto border-collapse border border-gray-300">
       <thead>
           <tr className="bg-[#025AA2] text-left text-sm font-semibold text-[#fedc61]">
              {/* <th className="border p-2">Psition</th>  */}
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Estimated</th>
                                <th className="border p-2">Actual</th>
                                <th className="border p-2">Projected</th>
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
               <th className="border p-2">Actions</th>
           </tr>
       </thead>
       <tbody>
       {ExpenditureGridData.map((row,index) => (
               <tr key={row.id} className="text-sm text-gray-700">
                   <td className="border p-2">{row.description}</td>
                   <td className="border p-2">
                   {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.estimated}
                               onChange={(e) => handleInputChange(index, "estimated", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.estimated
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.actual}
                               onChange={(e) => handleInputChange(index, "actual", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.actual
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.projected}
                               onChange={(e) => handleInputChange(index, "projected", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.projected
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.jul}
                               onChange={(e) => handleInputChange(index, "jul", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.jul
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.aug}
                               onChange={(e) => handleInputChange(index, "aug", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.aug
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.sep}
                               onChange={(e) => handleInputChange(index, "sep", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.sep
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.oct}
                               onChange={(e) => handleInputChange(index, "oct", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.oct
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.nov}
                               onChange={(e) => handleInputChange(index, "nov", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.nov
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.dec}
                               onChange={(e) => handleInputChange(index, "dec", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.dec
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.jan}
                               onChange={(e) => handleInputChange(index, "jan", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.jan
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.feb}
                               onChange={(e) => handleInputChange(index, "feb", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.feb
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.mar}
                               onChange={(e) => handleInputChange(index, "mar", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.mar
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.apr}
                               onChange={(e) => handleInputChange(index, "apr", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.apr
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.may}
                               onChange={(e) => handleInputChange(index, "may", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.may
                       )}
                   </td>
                   <td className="border p-2">
                       {editParentCode === index ? (
                           <input
                               type="text"
                               value={row.jun}
                               onChange={(e) => handleInputChange(index, "jun", e.target.value)}
                               className="w-full p-1 border rounded"
                           />
                       ) : (
                           row.jun
                       )}
                   </td>
                   <td className="border p-2">
    {editParentCode === index ? (
        <button
            onClick={() => handleSave(index)}
            className="bg-green-500 text-white p-1 rounded"
        >
            Save
        </button>
    ) : (
        <button
            onClick={() => handleEdit(index)}
            className="bg-blue-500 text-white p-1 rounded mr-2"
        >
            Edit
        </button>
    )}
</td>
               </tr>
           ))}
       </tbody>
   </table>
   <div className="flex justify-between mt-4">
                    <button 
                        onClick={handlePreviousPage} 
                        disabled={currentPage === 0}
                        className="bg-[#025AA2] text-[#fedc61] p-2 rounded flex items-center"
                    >
                        <ChevronLeftIcon className="h-5 w-5 mr-2" />
                        Previous
                    </button>
                    <button 
                        onClick={handleNextPage} 
                        disabled={currentPage >= totalPages - 1}
                        className="bg-[#025AA2] text-[#fedc61] p-2 rounded flex items-center"
                    >
                        <ChevronRightIcon className="h-5 w-5 mr-2" />
                        Next
                    </button>
                </div>
                </div>
    </div>
  );
};

export default ExpenseTemplate;