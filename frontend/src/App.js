import { uploadReport, getReport } from "./services/api";
import React, { useState } from "react";
import BasicDetails from "./components/BasicDetails";
import ReportSummary from "./components/ReportSummary";
import CreditAccounts from "./components/CreditAccounts";
import AddressList from "./components/AddressList";
import FileUpload from "./components/FileUpload";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);

    try {
      const response = await uploadReport(formData);
      const reportData = await getReport(response.reportId);
      setReport(reportData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Credit Report Analysis</h1>
        
        <FileUpload onFileSelect={handleFileUpload} error={error} />
        
        {loading && <LoadingSpinner />}
        
        {report && (
          <div className="space-y-6">
            <BasicDetails details={report.basicDetails} />
            <ReportSummary summary={report.reportSummary} />
            <CreditAccounts accounts={report.creditAccounts} />
            <AddressList addresses={report.addresses} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
