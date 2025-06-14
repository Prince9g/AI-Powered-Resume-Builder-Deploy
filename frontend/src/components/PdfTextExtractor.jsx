// utils/pdfOcr.js
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import Tesseract from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

export const PdfTextExtractor = async (file, setText) => {
  const fileReader = new FileReader();
  fileReader.onload = async function () {
    const typedArray = new Uint8Array(this.result);
    const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

    let combinedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const {
        data: { text },
      } = await Tesseract.recognize(canvas, "eng", {
        logger: (m) =>
          console.log(`Tesseract Progress: ${m.status} (${m.progress * 100}%)`),
      });

      combinedText += `Page ${i}:\n${text}\n\n`;
    }
    console.log("Extracted Text:", combinedText);
    setText(combinedText);
  };

  fileReader.readAsArrayBuffer(file);
};
