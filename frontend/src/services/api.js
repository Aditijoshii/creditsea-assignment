const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

export const uploadReport = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to upload report");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};

export const getReport = async (reportId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/${reportId}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch report");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch report: ${error.message}`);
  }
};

export const getReportsList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch reports");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch reports: ${error.message}`);
  }
};
