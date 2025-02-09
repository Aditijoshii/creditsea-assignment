const Report = require("../models/Report");

const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .select("basicDetails.name createdAt")
      .sort("-createdAt")
      .limit(10);

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch reports",
      details: error.message
    });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        error: "Report not found"
      });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch report",
      details: error.message
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        error: "Report not found"
      });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete report",
      details: error.message
    });
  }
};

module.exports = {
  getReports,
  getReportById,
  deleteReport
};
