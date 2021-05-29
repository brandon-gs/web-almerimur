import axios from "./axios";
import { CreateMachineValues } from "src/@types/machine";
import { Item } from "src/components/List/ListItem/ListItem";

export const createVehicle = async (machine: CreateMachineValues) => {
  try {
    const { name } = machine;
    let formData = new FormData();
    formData.append("name", name);
    const { data } = await axios({
      method: "POST",
      url: "/create_vehicle.php",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (e) {
    return { error: true, message: "Error al crear un vehículo" };
  }
};

export const getVehicles = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/get_vehicles.php",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (error) {
    return {
      error: true,
      message: "Error al obtener la lista de vehículos, intentelo de nuevo.",
    };
  }
};

export const putVehicle = async (vehicle: Item) => {
  try {
    let formData = new FormData();
    formData.append("id", vehicle.id);
    formData.append("name", vehicle.name);
    await axios({
      method: "POST",
      url: "/update_vehicle.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Vehículo actualizado" };
  } catch (error) {
    return {
      error: true,
      message: "Error al actualizar el vehículo, intentelo más tarde.",
    };
  }
};

export const deleteVehicle = async (id: string) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    await axios({
      method: "POST",
      url: "/delete_vehicle.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Vehículo eliminado" };
  } catch (error) {
    return {
      error: true,
      message: "Error al eliminar el vehículo, intentelo más tarde.",
    };
  }
};
