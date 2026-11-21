
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import plasticData from "./plasticData.js";
import upload, { identifyFromImage } from "./scanner.js";
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
const cors = require("cors");

app.use(cors({
    origin: [
        "https://plasticwise-ki67.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// HOME
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to PLASTICWISE API",
    status: "Backend is running",
    version: "1.0.0"
  });
});

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "PLASTICWISE backend is healthy"
  });
});

// GET ALL PLASTIC CATEGORIES
app.get("/api/plastics", (req, res) => {
  res.json({
    success: true,
    count: plasticData.length,
    plastics: plasticData
  });
});

// GET ONE PLASTIC CATEGORY
app.get("/api/plastics/:code", (req, res) => {
  const code = Number(req.params.code);

  if (!Number.isInteger(code) || code < 1 || code > 7) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid resin code from 1 to 7."
    });
  }

  const plastic = plasticData.find(
    (item) => item.code === code
  );

  if (!plastic) {
    return res.status(404).json({
      success: false,
      message: "Plastic category not found."
    });
  }

  res.json({
    success: true,
    plastic
  });
});

// MANUAL RESIN CODE IDENTIFICATION
app.post("/api/scan/manual", (req, res) => {
  const code = Number(req.body.code);

  if (!Number.isInteger(code) || code < 1 || code > 7) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid resin code between 1 and 7."
    });
  }

  const plastic = plasticData.find(
    (item) => item.code === code
  );

  return res.json({
    success: true,
    method: "manual",
    message: "Plastic category identified successfully.",
    plastic
  });
});
// IMAGE-BASED IDENTIFICATION USING OCR
app.post(
  "/api/scan/image",
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image."
        });
      }

      const result = await identifyFromImage(req.file.buffer);

      const suggestedPlastic = result.detectedCode
        ? plasticData.find(
            (item) => item.code === result.detectedCode
          )
        : null;

      return res.json({
        success: true,
        method: "image",
        message: suggestedPlastic
          ? "A possible resin code was detected. Please confirm it."
          : "No unique resin code could be identified. Please enter the code manually.",
        extractedText: result.extractedText,
        ocrConfidence: result.confidence,
        candidates: result.candidates,
        detectedCode: result.detectedCode,
        requiresConfirmation: true,
        suggestedPlastic
      });
    } catch (error) {
      next(error);
    }
  }
);
// HANDLE UNKNOWN ROUTES
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found."
  });
});

// ERROR HANDLER
app.use((error, req, res, next) => {
  console.error("Backend error:", error.message);

  res.status(500).json({
    success: false,
    message: "Something went wrong while processing your request."
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log("-----------------------------------");
  console.log("       PLASTICWISE BACKEND");
  console.log("-----------------------------------");
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Manual scan: POST /api/scan/manual");
  console.log("-----------------------------------");
});
