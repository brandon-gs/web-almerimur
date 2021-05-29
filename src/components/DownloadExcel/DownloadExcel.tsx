import ReactExport, { ExcelSheetData } from "react-data-export";
import { TableWork } from "src/@types/works";
import {
  calculatePrice,
  formatArrayDate,
  getMonthAndYear,
} from "src/helpers/filters";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const defaultHeaderStyle = {
  width: { wpx: 136, hpx: 100 },
  height: { hpx: 50 },
  style: {
    fill: { patternType: "solid", fgColor: { rgb: "FF1A8D8C" } },
    font: { bold: true, color: { rgb: "FFFFFFFF" } },
  },
};

const multiDataSet = (data: any[]): ExcelSheetData[] => [
  {
    columns: [
      {
        title: "Tipo de usuario",
        ...defaultHeaderStyle,
      }, // width in pixels
      { title: "Nombre", ...defaultHeaderStyle }, // width in charachters
      { title: "Periodo", ...defaultHeaderStyle }, // will check for width in pixels first
      { title: "Maquinaria", ...defaultHeaderStyle }, // will check for width in pixels first
      { title: "Proyecto", ...defaultHeaderStyle }, // will check for width in pixels first
      { title: "Cliente", ...defaultHeaderStyle }, // will check for width in pixels first
      { title: "Precio", ...defaultHeaderStyle }, // will check for width in pixels first
    ],
    data,
  },
];

interface Props {
  works: TableWork[];
}

export default function DownloadExcel({ works }: Props) {
  const convertWorksToDataset = () => {
    const excellKeys = [
      "role",
      "userName",
      "date",
      "machine",
      "project",
      "client",
    ];
    const dataWorks = works
      .filter((work) => work.checked)
      .map((work) => {
        const workExcell: any = [];
        Object.keys(work).forEach((key: string) => {
          if (excellKeys.includes(key)) {
            const indexKey = excellKeys.indexOf(key);
            if (key === "date" && work[key]) {
              workExcell[indexKey] = getMonthAndYear(
                formatArrayDate(work[key])
              );
            } else {
              workExcell[indexKey] = work[key as keyof TableWork];
            }
          } else if (key === "hourly") {
            workExcell[excellKeys.length] = calculatePrice(
              work.hours,
              work.hourly
            );
          }
        });
        return workExcell;
      });
    return dataWorks;
  };

  return (
    <ExcelFile
      element={
        <button type="button" className="button">
          Descargar
        </button>
      }
    >
      <ExcelSheet
        dataSet={multiDataSet(convertWorksToDataset())}
        name="Employees"
      ></ExcelSheet>
    </ExcelFile>
  );
}
