const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Import Routes
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();
const cors = require('cors');

// Use CORS middleware
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
