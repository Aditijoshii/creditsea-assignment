import React from "react";

const ReportSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Report Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-600">Total Accounts</p>
          <p className="text-xl font-medium">{summary.totalAccounts}</p>
        </div>
        <div>
          <p className="text-gray-600">Active Accounts</p>
          <p className="text-xl font-medium">{summary.activeAccounts}</p>
        </div>
        <div>
          <p className="text-gray-600">Closed Accounts</p>
          <p className="text-xl font-medium">{summary.closedAccounts}</p>
        </div>
        <div>
          <p className="text-gray-600">Current Balance</p>
          <p className="text-xl font-medium">₹{summary.currentBalanceAmount?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
