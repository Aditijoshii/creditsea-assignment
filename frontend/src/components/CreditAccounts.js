import React from "react";

const CreditAccounts = ({ accounts }) => {
  if (!accounts?.length) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Credit Accounts Information</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-left">Bank</th>
            <th className="p-3 text-left">Account Type</th>
            <th className="p-3 text-left">Account Number</th>
            <th className="p-3 text-right">Amount Overdue</th>
            <th className="p-3 text-right">Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{account.bank}</td>
              <td className="p-3">{account.type === "R" ? "Retail" : "Commercial"}</td>
              <td className="p-3">{account.accountNumber}</td>
              <td className="p-3 text-right text-red-600">
                ₹{account.amountOverdue.toLocaleString()}
              </td>
              <td className="p-3 text-right">
                ₹{account.currentBalance.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditAccounts;
