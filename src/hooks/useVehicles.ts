import React from "react";
import { getVehicles } from "src/api/vehicles.api";

interface ApiVehicle {
  name: string;
  id: string;
}

export default function useVehicles(setIsLoading: any) {
  const [firstTime, setFirstTime] = React.useState(true);
  const [vehicles, setVehicles] = React.useState<ApiVehicle[]>([]);
  const [vehiclesName, setVehiclesName] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getDatesFromAPI = async () => {
      setIsLoading(true);
      const { data, error } = await getVehicles();
      if (error) {
        setIsLoading(false);
      }
      if (data) {
        if (data.vehicles) {
          const clients = data.vehicles as ApiVehicle[];
          const clientsName: string[] = [];
          for (const client of clients) {
            for (const key in client) {
              if (key === "name") {
                clientsName.push(client[key]);
              }
            }
          }
          setVehiclesName(clientsName);
          setVehicles(clients);
        }
      }
      setIsLoading(false);
    };

    // If component is mounted update state
    if (firstTime) {
      getDatesFromAPI();
      setFirstTime(false);
    }
  }, [firstTime, setIsLoading]);

  return { vehicles, vehiclesName };
}
