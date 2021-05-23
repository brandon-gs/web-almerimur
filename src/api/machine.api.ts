import axios from "./axios";
import { CreateMachineValues } from "src/@types/machine";
import { Item } from "src/components/List/ListItem/ListItem";

export const createMachine = async (machine: CreateMachineValues) => {
  try {
    const { name } = machine;
    let formData = new FormData();
    formData.append("name", name);
    const { data } = await axios({
      method: "post",
      url: "/create_machine.php",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (e) {
    return { error: true, message: "Error al crear una maquina" };
  }
};

export const getMachines = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/get_machines.php",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (error) {
    return {
      error: true,
      message: "Error al obtener la lista de maquinas, intentelo de nuevo.",
    };
  }
};

export const putMachine = async (machine: Item) => {
  try {
    let formData = new FormData();
    formData.append("id", machine.id);
    formData.append("name", machine.name);
    await axios({
      method: "POST",
      url: "/update_machine.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Maquina actualizada" };
  } catch (error) {
    return {
      error: true,
      message: "Error al actualizar la maquina, intentelo más tarde.",
    };
  }
};

export const deleteMachine = async (id: string) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    await axios({
      method: "POST",
      url: "/delete_machine.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Maquina eliminada" };
  } catch (error) {
    return {
      error: true,
      message: "Error al eliminar la maquina, intentelo más tarde.",
    };
  }
};
