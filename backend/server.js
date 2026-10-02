require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Import routerów
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// --- Middleware CORS ---
const allowedOrigins = [
  "http://localhost:5173", // lokalny frontend dev
  process.env.CLIENT_URL, // frontend w produkcji
]
  .filter(Boolean)
  .map((url) => url.replace(/\/$/, ""));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, "");
      if (
        allowedOrigins.includes(cleanOrigin) ||
        !process.env.CLIENT_URL ||
        process.env.CLIENT_URL === "*"
      ) {
        return callback(null, true);
      } else {
        console.warn(`CORS Warning: origin ${origin} allowed as fallback.`);
        return callback(null, true);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware JSON
app.use(express.json());

// Połączenie z MongoDB
connectDB();

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "TaskManager API is running successfully!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Statyczne pliki (np. upload)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serwer
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
