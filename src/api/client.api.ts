import axios from "./axios";
import { CreateClientValues } from "src/@types/client";
import { Item } from "src/components/List/ListItem/ListItem";

export const createClient = async (client: CreateClientValues) => {
  try {
    const { name } = client;
    let formData = new FormData();
    formData.append("name", name);
    const { data } = await axios({
      method: "post",
      url: "/create_client.php",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (e) {
    return { error: true, message: "Error al crear un cliente" };
  }
};

export const getClients = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/get_clients.php",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (error) {
    return {
      error: true,
      message: "Error al obtener la lista de clientes, intentelo de nuevo.",
    };
  }
};

export const putClient = async (client: Item) => {
  try {
    let formData = new FormData();
    formData.append("id", client.id);
    formData.append("name", client.name);
    await axios({
      method: "POST",
      url: "/update_client.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Cliente actualizado" };
  } catch (error) {
    return {
      error: true,
      message: "Error al actualizar el cliente, intentelo más tarde.",
    };
  }
};

export const deleteClient = async (id: string) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    await axios({
      method: "POST",
      url: "/delete_client.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Cliente eliminado" };
  } catch (error) {
    return {
      error: true,
      message: "Error al eliminar el cliente, intentelo más tarde.",
    };
  }
};
