"use client";

import { useState } from "react";
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

const Dashboard = () => {
  type TabKey =
    | "Operational Formats"
    | "Income & Expenses accounts formats"
    | "Capital Expenditure Budget formats"
    | "Report"
    | "View"
    | "RegisterItem"
    |"ManPower";

  const tabs: Record<TabKey, string[]> = {
    "Operational Formats": ["Resource Mobilization", "Resource Allocation"],
    "Income & Expenses accounts formats": ["IncomeTemplates", "ExpenseTemplates"],
    "Capital Expenditure Budget formats": ["Capital Item", "Supply Item"],
    Report: [],
    View: [],
    RegisterItem:[],
    ManPower:[],
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
            return <IncomeTemplate/>;
          case "ExpenseTemplates":
            return <ExpenseTemplate/>;
          default:
            return <div className="text-black"></div>;
        }
      case "Capital Expenditure Budget formats":
        switch (activeSubTab) {
          case "Capital Item":
            return <CapitalItem/>;  
          case "Supply Item":
            return <SuplyItem/>;
          default:
            return <div className="text-black"></div>;
        }
      case "Report":
        return <Report />;
      case "View":
        return <EditableGrid />;
        case "RegisterItem":
        return <UnitPrice />;
        case "ManPower":
          return <ManPower />;
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
          {Object.keys(tabs).map((tab) => (
            <li key={tab}>
              {/* Parent Tab */}
              <div
                className={`flex items-center justify-between p-4 cursor-pointer ${
                  activeTab === tab ? "bg-blue-100 text-blue-700" : "text-gray-700"
                }`}
                onClick={() => {
                  setActiveTab(tab as TabKey);
                  setActiveSubTab(""); // Reset subtab when switching tabs
                  toggleCollapse(tab as TabKey); // Toggle collapse state
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
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Bar */ }
        <nav className="bg-[#025AA2] p-6 shadow " style={{ height: '90px' }}>
          <ul className="flex space-x-4 justify-end">
            {/* <li>
              <a href="#" className="text-[#fedc61] hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard/Login" className="text-[#fedc61] hover:underline">
                Login
              </a>
            </li> */}
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