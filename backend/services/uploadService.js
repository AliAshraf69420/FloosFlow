// utils/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolder),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safeExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
        if (!safeExts.includes(ext)) {
            return cb(new Error("Only image files are allowed"));
        }
        const uniqueName = `user-${req.userId}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    },
});

// Multer instance with file size limit (5MB)
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
