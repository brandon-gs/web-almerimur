import axios from "./axios";
import { CreateUserValues } from "src/@types/user";
import { LoginValues } from "src/pages/Login/Login";

export const loginAdmin = async (admin: LoginValues) => {
  try {
    const params = new URLSearchParams();
    params.append("username", admin.username);
    params.append("password", admin.password);
    const { data } = await axios.post("/login_admin.php", params);
    return {
      data: data,
      error: false,
    };
  } catch (e) {
    const message = e.response.data.message
      ? e.response.data.message
      : "Error al iniciar sesión";
    return { error: true, message: message.replace("Clave", "Contraseña") };
  }
};

export const createUser = async (user: CreateUserValues) => {
  try {
    const params = new URLSearchParams();
    for (const key in user) {
      params.append(key, user[key as keyof CreateUserValues]);
    }
    const { data } = await axios({
      method: "post",
      url: "/create_user.php",
      data: params,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (e) {
    return { error: true, message: "Error al crear usuario" };
  }
};
