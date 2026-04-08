const multer = require("multer");
const path = require("path");
const os = require("os"); // 1. Import Node's built-in OS module

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 2. Route all uploads to the system's temporary directory
    cb(null, os.tmpdir()); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// 3. Optional but highly recommended: Add a file size limit (e.g., 50MB) 
// to prevent massive files from crashing your server's RAM
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } 
});

module.exports = upload;