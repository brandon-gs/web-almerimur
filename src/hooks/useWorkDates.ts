import React from "react";
import { getWorkDates } from "src/api/filters";
import { formatArrayDate, getMonthAndYear } from "src/helpers/filters";

export default function useWorkDates(setIsLoading: any) {
  const [firstTime, setFirstTime] = React.useState(true);
  const [dates, setDates] = React.useState([]);
  const [arrayDates, setArrayDates] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    const getDatesFromAPI = async () => {
      setIsLoading(true);
      const res = await getWorkDates();
      if (res.data && res.data.dates) {
        const formatDates: string[] = await Promise.all(
          res.data.dates
            .map((date: any) => {
              if (date.hasOwnProperty("mechanic_work_date")) {
                const cDate = date["mechanic_work_date"];
                return cDate ? getMonthAndYear(formatArrayDate(cDate)) : null;
              }
              const cDate = date["driver_work_date"];
              return cDate ? getMonthAndYear(formatArrayDate(cDate)) : null;
            })
            .filter((date: any) => date)
        );
        const uniqueDates = [...new Set(formatDates)];
        setDates(res.data.dates);
        setArrayDates(uniqueDates);
        setIsLoading(false);
      }
      if (res.error) {
        setIsLoading(false);
      }
    };

    // If component is mounted update state
    if (firstTime) {
      getDatesFromAPI();
      setFirstTime(false);
    }
  }, [firstTime, setIsLoading]);

  return { dates, arrayDates };
}
