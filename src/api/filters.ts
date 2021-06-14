import axios from "./axios";

export const getWorkDates = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/admin/get_work_dates.php",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (e) {
    return { error: true, message: "Error al crear un cliente" };
  }
};

export const getAllWorks = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/admin/get_all_works.php",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    console.log(res);
    return { error: false, data: res.data };
  } catch (e) {
    return {
      error: true,
      message: "Error al obtener los trabajos creados, intentelo más tarde.",
    };
  }
};
