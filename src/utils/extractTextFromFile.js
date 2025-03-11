import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';

// Correct workerSrc for version 2.10.377
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const extractTextFromPDF = async (file) => {
  if (!file) throw new Error("No file found!");

  // Check if the file is a PDF
  if (file.type !== 'application/pdf') {
    throw new Error("Invalid file format. Only PDF files are supported.");
  }

  const fileBuffer = await readFileAsBuffer(file);

  const loadingTask = getDocument(fileBuffer);
  const pdf = await loadingTask.promise;

  let text = '';
  const maxPages = 2;

  // Limit to 2 pages
  const numPages = Math.min(pdf.numPages, maxPages);

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    content.items.forEach((item) => {
      text += item.str + ' ';
    });
  }

  // Check if the document has more than 2 pages
  if (pdf.numPages > maxPages) {
    throw new Error("Maximum of 2 pages is allowed");
  }

  return text;
};

// Utility function to read a file as a buffer using FileReader
const readFileAsBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  });
};

export default extractTextFromPDF;
