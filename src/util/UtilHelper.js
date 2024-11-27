import { saveAs } from 'file-saver';

export const setURLParam = (param, value) => {
  const newParams = new URLSearchParams(location.search);
  newParams.set(param, value);
  window.history.replaceState({}, "", `${location.pathname}?${newParams}`);
}

export const removeURLParam = (param) => {
  const newParams = new URLSearchParams(location.search);
  newParams.delete(param);
  window.history.replaceState({}, "", `${location.pathname}${(newParams.size>0)?"?":""}${newParams}`);
}

export const epochToTimestamp = (epochTime) => {
  if (epochTime === 0) return ''
  const date = new Date(epochTime);

  const padZero = (num) => num.toString().padStart(2, '0');

  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
}

export function createObjectFromStrings(stringList) {
  return stringList.reduce((acc, str) => {
    acc[str] = true;
    return acc;
  }, {});
}

export function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = "00";

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function epochTo12AM(timestamp) {
  const dateTimeString = epochToTimestamp(timestamp).replace(' ','T')
  let [datePart, _] = dateTimeString.split('T');
  return datePart + 'T00:00';
}

export function getPast24Hours(startDateStr) {
  const startDate = new Date(startDateStr);
  const past24Hours = [];

  for (let i = 0; i < 24; i++) {
    const date = new Date(startDate.getTime() - i * 60 * 60 * 1000);
    past24Hours.push(date);
  }

  return past24Hours.reverse();
}

export function getPast7Days(startDateStr) {
  const startDate = new Date(startDateStr);
  const past7Days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.getTime() - i * 24 * 60 * 60 * 1000);
    past7Days.push(date);
  }

  return past7Days.reverse();
}

export function getLastItem(arr) {
  return arr[arr.length - 1];
}

export function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function isValidEmail(email) {
  // Regular expression for validating an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex and return the result
  return emailRegex.test(email);
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getToday() {
  return new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function capitalizeFirstLetter(str) {
  return str.replace(/^./, str[0].toUpperCase());
}

export function objectToCSV(obj) {
  const keys = Object.keys(obj);
  const values = keys.map(key => obj[key]);

  // Enclose values in double quotes if they contain comma or double quote
  const csvValues = values.map(value =>
    typeof value === 'string' && (value.includes(',') || value.includes('"')) ?
      `"${value.replace(/"/g, '""')}"` :
      value
  );

  return csvValues.join(',')+',';
}

export function toNumber(value, returningValue = 0) {
  if (value == null || value === '') return returningValue;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (isNaN(value)) return returningValue;
  return +value;
}

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

export function downloadChart (chartRef, filename) {
  const b64 = chartRef.current.toBase64Image().replace('data:image/png;base64,', '');
  const content = b64toBlob(b64);
  const file = new File([content], `${filename}.png`, { type: 'image/png' });
  saveAs(file);
}

export function parseObjectList(str) {
  try {
    const objList = JSON.parse(str);
    if (!Array.isArray(objList) || objList.some(obj => typeof obj !== 'object' || obj === null || Array.isArray(obj))) {
      console.error('Invalid format')
    }
    return objList;
  } catch (error) {
    console.error('Error parsing object list:', error.message);
    return null;
  }
}

export function formatDate(format, date, noTime = false) {
  if (isNaN(date.getDate())) { return "" }
  const pad = num => num.toString().padStart(2, '0');
  const [year, month, day, hours, minutes, seconds] = [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ];

  let formattedDate;
  switch (format) {
    case "DD/MM/YYYY":
      formattedDate = `${day}/${month}/${year}`;
      break;
    case "MM/DD/YYYY":
      formattedDate = `${month}/${day}/${year}`;
      break;
    case "MM-DD-YYYY":
      formattedDate = `${month}-${day}-${year}`;
      break;
    case "YYYY-MM-DD":
      formattedDate = `${year}-${month}-${day}`;
      break;
    default:
      formattedDate = `${day}-${month}-${year}`;
  }

  return noTime ? formattedDate : `${formattedDate} ${hours}:${minutes}:${seconds}`;
}

export function dateRangeFormat(format) {
  switch (format) {
    case "DD/MM/YYYY": return 'd/m/Y';
    case "MM/DD/YYYY": return 'm/d/Y';
    case "MM-DD-YYYY": return 'm-d-Y';
    default: return 'd-m-Y';
  }
}

export function isBetweenInclusive(date, start, end, fallbackValue = true) {
  if (!start || !end) return fallbackValue
  end.setHours(23, 59, 59, 999);
  return start <= date && date <= end;
}

export function basicSort(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function formatDateParam(date) {
  // Check if the passed parameter is a Date object and is valid
  if (!(date instanceof Date) || isNaN(date)) {
    return null;
  }

  // Get the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format the date as YYYY-MM-DDTHH:mm:ssZ
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export function checkStatus(doubleString, defaultColor="success") {
  // Convert the string to a number
  const double = parseFloat(doubleString);

  // Check if the input is a valid number
  if (isNaN(double)) {
    return "error: invalid input";
  }

  // Calculate the percentage
  // Determine the status based on the percentage
  if (double >= 99) {
    return defaultColor;
  } else if (double >= 98) {
    return "warning";
  } else {
    return "error";
  }
}

export const isValidHex = (color) => /^#([0-9A-F]{3}){1,2}$/i.test(color);