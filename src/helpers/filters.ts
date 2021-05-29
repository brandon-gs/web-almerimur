export enum FiltersTypes {
  periods = "Filtrar por periodo",
  client = "Filtrar por cliente",
  employee = "Filtrar por empleado",
  machine = "Filtrar por maquinaria",
}

export function formatArrayDate(date: string) {
  if (date) {
    const [yearS, monthS, dayS] = date.split("-");
    if (yearS && monthS && dayS) {
      const _date = new Date(
        parseInt(yearS),
        parseInt(monthS) - 1,
        parseInt(dayS)
      );
      const day = _date.getDate();
      const month = getMonthName(_date.getMonth());
      const year = _date.getFullYear();
      return `${day} ${month} ${year}`;
    }
  }
  return date;
}

export function getMonthName(month: number) {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months[month];
}

export const sortByChecked = (worka: any, workb: any) => {
  return worka.checked === workb.checked ? 0 : worka.checked ? -1 : 1;
};

export const sortByCreatedAt = (worka: any, workb: any) => {
  const a = new Date(worka.createdAt) as any;
  const b = new Date(workb.createdAt) as any;
  return a - b;
};

export const sortByDate = (worka: any, workb: any) => {
  if (!worka.date) return 1;
  if (!workb.date) return -1;
  const a = new Date(worka.date) as any;
  const b = new Date(workb.date) as any;
  return a - b;
};

export function showNA(value?: string) {
  return value ? value : "N/A";
}

export function calculatePrice(hours?: string, hourly?: string) {
  return hours && hourly
    ? parseInt(hours) * parseInt(hourly) + " €"
    : "No se puede calcular";
}

export function getMonthAndYear(date: string) {
  const [, month, year] = date.split(" ");
  return `${month} ${year}`;
}

export async function saveValueOnSessionStorage(key: string, value: string) {
  if (value !== sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, value);
  }
}
