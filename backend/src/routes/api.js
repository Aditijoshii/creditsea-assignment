const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const reportController = require("../controllers/reportController");

// Upload routes
router.post("/upload", uploadController.upload, uploadController.uploadXML);

// Report routes
router.get("/reports", reportController.getReports);
router.get("/reports/:id", reportController.getReportById);
router.delete("/reports/:id", reportController.deleteReport);

module.exports = router;
