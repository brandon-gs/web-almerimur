import axios from "./axios";
import { RechangeValues } from "src/@types/rechange";

export interface ItemRechange {
  id: number;
  title: string;
  name: string;
  price: number;
}

export const createRechange = async (rechange: RechangeValues) => {
  try {
    const { name, price } = rechange;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price + "");
    const { data } = await axios({
      method: "POST",
      url: "/rechange/create.php",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (e) {
    return { error: true, message: "Error al crear el recambio" };
  }
};

export const getRechanges = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/rechange/get.php",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (error) {
    return {
      error: true,
      message: "Error al obtener la lista de recambios, intentelo de nuevo.",
    };
  }
};

export const getRechangesByIdWork = async (idWork: string) => {
  try {
    let formData = new FormData();
    formData.append("id_work", idWork);
    const { data } = await axios({
      method: "POST",
      url: "/mechanic/get_work_rechanges.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (error) {
    return {
      error: true,
      message: "Error al obtener la lista de recambios, intentelo de nuevo.",
    };
  }
};

export const putRechange = async (rechange: ItemRechange) => {
  try {
    let formData = new FormData();
    formData.append("id", rechange.id + "");
    formData.append("name", rechange.name);
    formData.append("price", rechange.price + "");
    await axios({
      method: "POST",
      url: "/rechange/update.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Recambio actualizado" };
  } catch (error) {
    return {
      error: true,
      message: "Error al actualizar el recambio, intentelo más tarde.",
    };
  }
};

export const deleteRechangeById = async (id: string) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    await axios({
      method: "POST",
      url: "/rechange/delete.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Recambio eliminado" };
  } catch (error) {
    return {
      error: true,
      message: "Error al eliminar el recambio, intentelo más tarde.",
    };
  }
};
