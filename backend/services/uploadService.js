const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolder),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return cb(new Error(`Invalid file type. Only ${ALLOWED_EXTENSIONS.join(", ")} are allowed`));
        }
        const uniqueName = `user-${req.userId}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return cb(new Error(`Invalid file type. Only ${ALLOWED_EXTENSIONS.join(", ")} are allowed`), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
});

const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                return res.status(400).json({
                    error: `File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`
                });
            case "LIMIT_FILE_COUNT":
                return res.status(400).json({
                    error: "Too many files uploaded"
                });
            case "LIMIT_UNEXPECTED_FILE":
                return res.status(400).json({
                    error: "Unexpected field name in file upload"
                });
            default:
                return res.status(400).json({
                    error: err.message || "File upload error"
                });
        }
    } else if (err) {
        return res.status(400).json({
            error: err.message || "An error occurred during file upload"
        });
    }
    next();
};

const validateFileUpload = (req, res, next) => {
    if (!req.file && !req.files) {
        return res.status(400).json({
            error: "No file uploaded. Please select a file to upload"
        });
    }
    next();
};

module.exports = {
    upload,
    handleUploadError,
    validateFileUpload,
    ALLOWED_EXTENSIONS,
    MAX_FILE_SIZE
};
