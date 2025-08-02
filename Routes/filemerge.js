const express = require("express");
const { PDFDocument } = require("pdf-lib");
const Router = express.Router();

Router.post("/filemerge", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length < 2) {
      return res.status(400).json({
        error: "Please provide at least two PDF files in Base64 format",
        status: "error",
      });
    }

    // Create a new empty PDF
    const mergedPdf = await PDFDocument.create();

    for (const base64 of items) {
      try {
        // Convert Base64 to Uint8Array
        const pdfBytes = Buffer.from(base64, "base64");

        // Load PDF
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Copy all pages to the merged PDF
        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      } catch (err) {
        return res.status(400).json({
          error: "Invalid PDF in the array",
          details: err.message,
        });
      }
    }

    // Save merged PDF as Base64
    const mergedPdfBytes = await mergedPdf.save();
    const mergedBase64 = Buffer.from(mergedPdfBytes).toString("base64");

    return res.status(200).json({
      message: "PDF files merged successfully",
      status: "success",
      mergedFile: mergedBase64, // Final merged PDF in Base64
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      status: "error",
      details: err.message,
    });
  }
});

module.exports = Router;
