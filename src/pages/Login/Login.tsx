import React, { useState } from "react";
import { useHistory } from "react-router";
import { loginAdmin } from "src/api/user.api";
import { Input } from "src/components";
import Alert from "src/components/Alert";
import "./Login.css";

export interface LoginValues {
  username: string;
  password: string;
}

function Login() {
  const [values, setValues] = useState<LoginValues>({
    username: "",
    password: "",
  });

  const history = useHistory();

  const [alert, setAlert] = useState({ show: false, message: "" });

  const handleCloseAlert = () => setAlert({ ...alert, show: false });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await loginAdmin(values);
    if (response.error && response.message) {
      setAlert({ show: true, message: response.message });
      return;
    }
    const { data } = response;
    if (data) localStorage.setItem("token", data.token);
    history.push("/dashboard");
  };

  return (
    <div className="login_container">
      <Alert
        show={alert.show}
        message={alert.message}
        onClose={handleCloseAlert}
      />
      <div className="login_logo">
        <img src="/img/logo@2x.png" alt="logo" />
      </div>
      <form className="login_form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          onChange={handleInputChange}
          className="mb-4"
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleInputChange}
          className="mb-4"
        />
        <button className="button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
