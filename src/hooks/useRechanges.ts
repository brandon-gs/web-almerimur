import React from "react";
import { getRechanges } from "src/api/rechange.api";

export interface ApiRechange {
  rechange_title: string;
  rechange_price: string;
  rechange_id: string;
}

export default function useRechanges(setIsLoading: any) {
  const [firstTime, setFirstTime] = React.useState(true);
  const [rechanges, setRechanges] = React.useState<ApiRechange[]>([]);
  const [rechangesName, setRechangesName] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getRechangesFromAPI = async () => {
      setIsLoading(true);
      const { data, error } = await getRechanges();
      if (error) {
        setIsLoading(false);
      }
      if (data) {
        if (data.rechanges) {
          const rechanges = data.rechanges as ApiRechange[];
          const rechangesName: string[] = [];
          for (const rechange of rechanges) {
            rechangesName.push(rechange.rechange_title);
          }
          setRechangesName(rechangesName);
          setRechanges(rechanges);
        }
      }
      setIsLoading(false);
    };

    // If component is mounted update state
    if (firstTime) {
      getRechangesFromAPI();
      setFirstTime(false);
    }
  }, [firstTime, setIsLoading]);

  return { rechanges, rechangesName };
}
