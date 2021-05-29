import React from "react";
import { getClients } from "src/api/client.api";

interface ApiClient {
  client_name: string;
  client_id: string;
}

export default function useClients(setIsLoading: any) {
  const [firstTime, setFirstTime] = React.useState(true);
  const [clients, setClients] = React.useState<ApiClient[]>([]);
  const [clientsName, setClientsName] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getDatesFromAPI = async () => {
      setIsLoading(true);
      const { data, error } = await getClients();
      if (error) {
        setIsLoading(false);
      }
      if (data) {
        if (data.clients) {
          const clients = data.clients as ApiClient[];
          const clientsName: string[] = [];
          for (const client of clients) {
            for (const key in client) {
              if (key === "client_name") {
                clientsName.push(client[key]);
              }
            }
          }
          setClientsName(clientsName);
          setClients(clients);
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

  return { clients, clientsName };
}
