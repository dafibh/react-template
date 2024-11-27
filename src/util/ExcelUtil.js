import { exportToExcel } from 'react-json-to-excel';

export const downloadExcel = (filename, contents) => {
  const excel_data = []

  Object.keys(contents).forEach(key => {
    const sheetContents = []
    contents[key].forEach(value => {
      sheetContents.push(value);
    });
    excel_data.push(
      {
        sheetName: key,
        details: sheetContents
      }
    )
  });
  exportToExcel(excel_data, filename, true)
}