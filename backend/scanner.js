
import multer from "multer";
import { createWorker } from "tesseract.js";

// Store uploaded images temporarily in memory.
// Maximum image size: 5 MB.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error("Only JPG, PNG and WEBP images are allowed.")
      );
    }

    callback(null, true);
  }
});

// Reuse one OCR worker instead of creating a new one
// for every uploaded image.
let workerPromise;

async function getWorker() {
  if (!workerPromise) {
    workerPromise = createWorker("eng");
  }

  return workerPromise;
}

// Read text from the uploaded image and look for
// possible resin identification numbers.
export async function identifyFromImage(imageBuffer) {
  const worker = await getWorker();

  const result = await worker.recognize(imageBuffer);

  const extractedText = result.data.text.trim();
  const confidence = Math.round(result.data.confidence || 0);

  // Find standalone digits from 1 to 7.
  const matches = extractedText.match(/\b[1-7]\b/g) || [];

  const candidates = [...new Set(matches)].map(Number);

  // Only automatically suggest a code when one
  // unique candidate is detected.
  const detectedCode =
    candidates.length === 1 ? candidates[0] : null;

  return {
    extractedText,
    confidence,
    candidates,
    detectedCode,
    requiresConfirmation: true
  };
}

export default upload;
