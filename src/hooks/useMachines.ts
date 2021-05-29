import React from "react";
import { getMachines } from "src/api/machine.api";

interface ApiMachine {
  machine_name: string;
  machine_id: string;
}

export default function useMachines(setIsLoading: any) {
  const [firstTime, setFirstTime] = React.useState(true);
  const [machines, setMachines] = React.useState<ApiMachine[]>([]);
  const [machinesName, setMachinesName] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getDatesFromAPI = async () => {
      setIsLoading(true);
      const { data, error } = await getMachines();
      if (error) {
        setIsLoading(false);
      }
      if (data) {
        if (data.machines) {
          const clients = data.machines as ApiMachine[];
          const clientsName: string[] = [];
          for (const client of clients) {
            for (const key in client) {
              if (key === "machine_name") {
                clientsName.push(client[key]);
              }
            }
          }
          setMachinesName(clientsName);
          setMachines(clients);
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

  return { machines, machinesName };
}
