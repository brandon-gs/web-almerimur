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
    const message = e.response
      ? e.response.data.message
      : "Error al iniciar sesión";
    return { error: true, message: message.replace("Clave", "Contraseña") };
  }
};

export const createUser = async (user: CreateUserValues, file: any) => {
  try {
    const {
      name,
      password,
      contract,
      hourly,
      job,
      email,
      role,
      MAX_FILE_SIZE,
    } = user;
    let formData = new FormData();
    formData.append("MAX_FILE_SIZE", MAX_FILE_SIZE);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("contract", contract);
    formData.append("hourly", hourly);
    formData.append("job", job);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("image", file);
    const { data } = await axios({
      method: "post",
      url: "/create_user.php",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    });
    return { error: false, data };
  } catch (e) {
    return { error: true, message: "Error al crear usuario" };
  }
};
