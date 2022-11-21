import * as XLSX from 'xlsx';

const Excel = () => {
    const xlsx = require("xlsx");
    const workbook = xlsx.readFile("exExcel.xlsx");
    console.log(workbook);
    const ws = workbook.SheetNames[0];
    console.log(ws);
    const records = XLSX.utils.sheet_to_json(ws);
    console.log(records);
}

export default Excel;