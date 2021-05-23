import axios from "./axios";
import { CreateProjectValues } from "src/@types/project";
import { Item } from "src/components/List/ListItem/ListItem";

export const createProject = async (project: CreateProjectValues) => {
  try {
    const { name } = project;
    let formData = new FormData();
    formData.append("name", name);
    const { data } = await axios({
      method: "post",
      url: "/create_project.php",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (e) {
    return { error: true, message: "Error al crear un proyecto" };
  }
};

export const getProjects = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/get_projects.php",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (error) {
    return {
      error: true,
      message: "Error al obtener la lista de proyectos, intentelo de nuevo.",
    };
  }
};

export const putProject = async (project: Item) => {
  try {
    let formData = new FormData();
    formData.append("id", project.id);
    formData.append("name", project.name);
    await axios({
      method: "POST",
      url: "/update_project.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Proyecto actualizado" };
  } catch (error) {
    return {
      error: true,
      message: "Error al actualizar el proyecto, intentelo más tarde.",
    };
  }
};

export const deleteProject = async (id: string) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    await axios({
      method: "POST",
      url: "/delete_project.php",
      data: formData,
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, message: "Proyecto eliminado" };
  } catch (error) {
    return {
      error: true,
      message: "Error al eliminar el proyecto, intentelo más tarde.",
    };
  }
};
