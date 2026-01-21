const multer = require("multer");

// Konfiguracja miejsca zapisu i nazwy pliku
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Filtracja typów plików
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Nieobsługiwany format pliku"), false);
    }
};

// Tworzenie upload middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
