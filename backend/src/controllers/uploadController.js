const multer = require("multer");
const XMLParser = require("../services/xmlParser");
const Report = require("../models/Report");

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/xml" || file.mimetype === "text/xml") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only XML files are allowed."));
    }
  }
});

const uploadXML = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const xmlData = req.file.buffer.toString();
    const parsedData = await XMLParser.parseXMLData(xmlData);
    
    const report = new Report(parsedData);
    await report.save();

    res.status(201).json({
      message: "Report uploaded and processed successfully",
      reportId: report._id
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to process XML file",
      details: error.message
    });
  }
};

module.exports = {
  upload: upload.single("file"),
  uploadXML
};
