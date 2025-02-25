"use client";

import { useEffect, useState } from "react";
import ResourceMobilization from "./operational-formats/Resource Mobilization/page";
import ResourceAlloccation from "./operational-formats/Resource Allocation/page";
import Report from "./Report/page";
import EditableGrid from "./view/page";
import ExpenseTemplate from "./Income&Expenses/ExpenseTemplates/page";
import IncomeTemplate from "./Income&Expenses/IncomeTemplates/page";
import CapitalItem from "./Capital&Supplies/CapitalItem/page";
import UnitPrice from "./UnitPrice/page";
import SuplyItem from "./Capital&Supplies/SuplyItem/page";
import ManPower from "./ManPowerReq/page";
import HrGrid from "./HumanResource/page";
import TabGrid from "./ReportTabs/page";
import CapGrid from "./ViewOnlyCap/page";
import ManGrid from "./OnlyManPO/page";
import ExpenseByDiGrid from "./viewExpenseByDistrict/page";
import ExpenditureByDiGrid from "./ViewCapitalExpenditureByDistrict/page";

const Dashboard = () => {
  const [districtRight, setDistrictRight] = useState<string | null>(null);
  const [branchCode, setBranchCode] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isHr, setIsHr] = useState<boolean>(false);
  const [isCoo, setIsCoo] = useState<boolean>(false);
  const [isDis, setIsDis] = useState<boolean>(false);
  const [isBus, setIsBus] = useState<boolean>(false);
  const [isBan, setIsBan] = useState<boolean>(false);
  const [isDig, setIsDig] = useState<boolean>(false);
  const [isStr, setIsStr] = useState<boolean>(false);

  useEffect(() => {
    const storedDistrictRight = sessionStorage.getItem("district_code");
    setDistrictRight(storedDistrictRight);
    
    const storedBranchCode = sessionStorage.getItem("branch_code");
    setBranchCode(storedBranchCode);
    
    const storedUserId = sessionStorage.getItem("userId");
    setUserId(storedUserId);
    
    setIsHr(Number(sessionStorage.getItem("IsHr")) === 1);
    setIsStr(Number(sessionStorage.getItem("IsStr")) === 1);
    setIsCoo(Number(sessionStorage.getItem("IsCoo")) === 1);
    setIsDis(Number(sessionStorage.getItem("IsDis")) === 1);
    setIsBus(Number(sessionStorage.getItem("IsBus")) === 1);
    setIsBan(Number(sessionStorage.getItem("IsBan")) === 1);
    setIsDig(Number(sessionStorage.getItem("IsDig")) === 1);

  }, []);

  console.log(isHr,isCoo,isDis,isBus,isBan,isDig,isStr)

  type TabKey =
    | "Operational Formats"
    | "Income & Expenses accounts formats"
    | "Capital Expenditure Budget formats"
    | "AuthoriationMenu"
    | "Report"
    | "View"
    | "RegisterItem"
    | "ManPower"
    | "CapitalExpenditure"
    | "ManPowerPlan"
    | "viewExpenseByDistrict"
    | "viewExpenditureByDistrict";

  const tabs: Record<TabKey, string[]> = {
    "Operational Formats": ["Resource Mobilization", "Resource Allocation"],
    "Income & Expenses accounts formats": ["IncomeTemplates", "ExpenseTemplates"],
    "Capital Expenditure Budget formats": ["Capital Item", "Supply Item"],
    AuthoriationMenu: [],
    Report: [],
    View: [],
    RegisterItem: [],
    ManPower: [],
    CapitalExpenditure: [],
    ManPowerPlan: [],
    viewExpenseByDistrict: [],
    viewExpenditureByDistrict: [],
  };

  const [activeTab, setActiveTab] = useState<TabKey | "">("");
  const [activeSubTab, setActiveSubTab] = useState<string>("");
  const [collapsedTabs, setCollapsedTabs] = useState<Record<TabKey, boolean>>(
    Object.keys(tabs).reduce((acc, tab) => {
      acc[tab as TabKey] = true; // Initially, all tabs are collapsed
      return acc;
    }, {} as Record<TabKey, boolean>)
  );

  const toggleCollapse = (tab: TabKey) => {
    setCollapsedTabs((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }));
  };

  const shouldHideTab = (tab: TabKey) => {
    if (isHr) {
      return [
        "Income & Expenses accounts formats",
        "Operational Formats",
        "Capital Expenditure Budget formats",
        "View",
        "RegisterItem",
        "CapitalExpenditure"
      ].includes(tab);
    }
    
    if (isCoo) {
      return [
        "RegisterItem",
        "Income & Expenses accounts formats",
        "Operational Formats",
        "Capital Expenditure Budget formats",
        "AuthoriationMenu",
        "Report",
        "View",
        "viewExpenseByDistrict",
        "ManPower",
        "ManPowerPlan"
      ].includes(tab);
    }

    if (isDis) {
      return [
        "RegisterItem",
        "ManPower",
        "ManPowerPlan",
        "viewExpenseByDistrict"
      ].includes(tab);
    }

    if (isStr) {
      return [
        "Income & Expenses accounts formats",
        "Operational Formats",
        "Capital Expenditure Budget formats",
        "RegisterItem",
        "ManPower"
      ].includes(tab);
    }

    // Final check for all roles to hide specific tabs
    if (!(isDis || isHr || isCoo || isStr || isDig || isBan || isBus)) {
      return [
        "viewExpenseByDistrict",
        "RegisterItem",
        "ManPower",
        "AuthoriationMenu",
        "Report",
        "CapitalExpenditure",
        "ManPowerPlan"
      ].includes(tab);
    }
    return false; // Show the tab
  };
  const renderContent = () => {
    switch (activeTab) {
      case "Operational Formats":
        switch (activeSubTab) {
          case "Resource Mobilization":
            return <ResourceMobilization />;
          case "Resource Allocation":
            return <ResourceAlloccation />;
          default:
            return <div className="text-black"></div>;
        }
      case "Income & Expenses accounts formats":
        switch (activeSubTab) {
          case "IncomeTemplates":
            return <IncomeTemplate />;
          case "ExpenseTemplates":
            return <ExpenseTemplate />;
          default:
            return <div className="text-black"></div>;
        }
      case "Capital Expenditure Budget formats":
        switch (activeSubTab) {
          case "Capital Item":
            return <CapitalItem />;
          case "Supply Item":
            return <SuplyItem />;
          default:
            return <div className="text-black"></div>;
        }
      case "AuthoriationMenu":
        return <Report />;
      case "Report":
        return <TabGrid />;
      case "View":
        return <EditableGrid />;
      case "RegisterItem":
        return <UnitPrice />;
      case "ManPower":
        return <ManPower />;
      case "CapitalExpenditure":
        return <CapGrid />;
      case "ManPowerPlan":
        return <ManGrid />;
      case "viewExpenseByDistrict":
        return <ExpenseByDiGrid />;
      case "viewExpenditureByDistrict":
        return <ExpenditureByDiGrid />;
      default:
        return <div className="text-[#025AA2] font-bold">WELCOME</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 font-bold text-xl text-[#025AA2]">
          Automate Plan and Budget
        </div>
        <hr className="border-t-2 border-black" />
        <ul>
          {Object.keys(tabs).map((tab) => {
            if (shouldHideTab(tab as TabKey)) {
              return null; // Skip rendering this tab
            }

            return (
              <li key={tab}>
                {/* Parent Tab */}
                <div
                  className={`flex items-center justify-between p-4 cursor-pointer ${
                    activeTab === tab ? "bg-blue-100 text-blue-700" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setActiveTab(tab as TabKey);
                    setActiveSubTab("");
                    toggleCollapse(tab as TabKey);
                  }}
                >
                  {tab}
                  {tabs[tab as TabKey].length > 0 && (
                    <span className="text-lg" onClick={(e) => { e.stopPropagation(); toggleCollapse(tab as TabKey); }}>
                      {collapsedTabs[tab as TabKey] ? "+" : "−"}
                    </span>
                  )}
                </div>

                {/* Subtabs (Collapsible under the parent tab) */}
                {!collapsedTabs[tab as TabKey] && tabs[tab as TabKey].length > 0 && (
                  <ul className="ml-4">
                    {tabs[tab as TabKey].map((subTab) => (
                      <li
                        key={subTab}
                        className={`p-2 cursor-pointer ${
                          activeSubTab === subTab
                            ? "bg-blue-200 text-blue-800"
                            : "text-gray-600"
                        }`}
                        onClick={() => {
                          setActiveSubTab(subTab);
                          setActiveTab(tab as TabKey); // Keep the active tab in sync
                        }}
                      >
                        {subTab}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Bar */}
        <nav className="bg-[#025AA2] p-6 shadow" style={{ height: '90px' }}>
          <ul className="flex space-x-4 justify-end">
            <li>
              <a href="/dashboard/Logout" className="flex items-center text-[#fedc61] hover:underline">
                Logout
              </a>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="bg-[#025AA2] text-[#fedc61] p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Amhara Bank. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;