import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
import type * as PDFJS from "pdfjs-dist";
import type { TextContent, TextItem } from "pdfjs-dist/types/src/display/api";

type PDFJSLib = typeof PDFJS;

let pdfjsLib: PDFJSLib | null = null;
let loadPromise: Promise<PDFJSLib> | null = null;

async function loadPdfJs(): Promise<PDFJSLib> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    const pdfLib = lib as unknown as PDFJSLib;
    pdfLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
    pdfjsLib = pdfLib;
    return pdfLib;
  });

  return loadPromise;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  const lib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = lib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = (await page.getTextContent()) as TextContent;

    const pageText = content.items
      .filter((item): item is TextItem => "str" in item)
      .map((item) => item.str)
      .join(" ");

    fullText += pageText + "\n";
  }

  return fullText;
}
