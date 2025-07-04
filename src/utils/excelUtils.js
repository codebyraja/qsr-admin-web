import * as XLSX from "xlsx";
import { toast } from "react-toastify";

/**
 * Reads and parses an Excel file (.xlsx/.xls/.csv)
 *
 * @param {File} file - File object from input
 * @param {Function} onSuccess - Callback with parsed data (array of arrays)
 * @param {Function} [onError] - Optional callback if error occurs
 */
export const readExcelFile = (file, onSuccess, onError) => {
  if (!file) {
    toast.warning("No file selected");
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length > 0) {
        onSuccess(jsonData); // send parsed data to callback
      } else {
        toast.error("Excel file is empty");
        if (onError) onError("Empty file");
      }
    } catch (err) {
      console.error("Error reading Excel:", err);
      toast.error("Failed to read Excel file");
      if (onError) onError(err);
    }
  };

  reader.readAsArrayBuffer(file);
};
