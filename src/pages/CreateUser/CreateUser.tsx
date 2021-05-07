import { useEffect, useState } from "react";
import "./CreateUser.css";
import edit from "../../assets/svg/edit.svg";
import { Input, SelectInput, Sidebar } from "../../components";
import { CreateUserValues } from "src/@types/user";
import { createUser } from "src/api/user.api";
import Alert from "src/components/Alert";

const defaultValues: CreateUserValues = {
  role: "Conductor",
  name: "",
  job: "",
  image: "",
  email: "",
  password: "",
  confirmPassword: "",
  contract: "",
  hourly: "",
};

function CreateUser() {
  const [values, setValues] = useState<CreateUserValues>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");

  const updateErrors = (errors: Record<string, string>) => setErrors(errors);

  const handleSelectChange = (name: string) => (value: string) => {
    setValues({ ...values, [name]: value });
  };

  const handleInputChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrors({ ...errors, [name]: "" });
    setValues({ ...values, [name]: event.target.value });
  };

  const handleUploadImage = () => {
    // TODO: upload image to the server and set his url in values state
    console.log("Upload image");
  };

  const getErrors = () => {
    let _errors = errors;
    let hasErrors = false;
    for (const key in values) {
      if (values[key as keyof CreateUserValues] === "" && key !== "image") {
        _errors[key as keyof CreateUserValues] = "Este campo es requerido";
        hasErrors = true;
      }
    }
    if (values.password !== values.confirmPassword) {
      _errors.password = "Las contraseñas no coinciden";
      hasErrors = true;
    }
    return { errors: _errors, hasErrors };
  };

  const handleSubmit = async () => {
    // Validate form
    const { hasErrors, errors } = getErrors();
    updateErrors(errors);
    // Do api call to create user
    if (!hasErrors) {
      try {
        const response = await createUser(values);
        console.log(response)
        if (response.error && response.message) {
          setServerError(response.message.toString());
          return;
        }
        setValues(defaultValues);
        setErrors({});
      } catch (error) {
        setServerError("Error al crear el usuario, intente más tarde.");
      }
    } else {
      window.scrollTo({ top: 0 });
      setServerError("Todos los campos son requeridos.");
    }
  };

  const onCloseAlert = () => setServerError("");

  /** Close alert after 5s */
  useEffect(() => {
    const resetAlert = setTimeout(() => {
      if (serverError) {
        onCloseAlert();
      }
    }, 10000);
    return () => {
      clearTimeout(resetAlert);
    };
  }, [serverError]);

  return (
    <div className="page">
      <Alert
        show={Boolean(serverError)}
        message={serverError}
        onClose={onCloseAlert}
      />
      <Sidebar />
      <main className="panel">
        <section className="panel_columns">
          <article className="panel_column">
            <h1 className="panel_title mb-4">Dar de alta</h1>
            <p className="panel_text mb-5">Usuario</p>
            <div className="panel_edit_image mb-4">
              <img
                src={edit}
                alt="Boton para editar"
                className="panel_image_button"
                onClick={handleUploadImage}
              />
              <img
                src="/img/default_user.png"
                alt="usuario a dar de alta"
                className="panel_image"
              />
            </div>
            <SelectInput
              placeholder="Rol"
              className="mb-3"
              value={values.role}
              items={["Conductor", "Mecánico"]}
              onChange={handleSelectChange("role")}
            />
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              className="mb-4"
              value={values.name}
              error={errors.name}
              onChange={handleInputChange("name")}
            />
            <Input
              type="text"
              name="job"
              placeholder="Oficio"
              className="mb-4"
              value={values.job}
              error={errors.job}
              onChange={handleInputChange("job")}
            />
            <Input
              type="email"
              name="email"
              placeholder="Correo eléctronico"
              className="mb-4"
              value={values.email}
              error={errors.email}
              onChange={handleInputChange("email")}
            />
          </article>
          <article className="panel_column">
            <p className="panel_text-section mt-6 mb-3">Crear contraseña</p>
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="mb-4"
              value={values.password}
              error={errors.password}
              onChange={handleInputChange("password")}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              className="mb-4"
              value={values.confirmPassword}
              error={errors.password}
              onChange={handleInputChange("confirmPassword")}
            />
            <p className="panel_text-section mb-3">Contrato</p>
            <Input
              type="text"
              name="contract"
              placeholder="Tipo de contrato"
              className="mb-4"
              value={values.contract}
              error={errors.contract}
              onChange={handleInputChange("contract")}
            />
            <Input
              type="text"
              name="hourly"
              placeholder="Pago por horas"
              className="mb-4"
              value={values.hourly}
              error={errors.hourly}
              onChange={handleInputChange("hourly")}
            />
          </article>
        </section>
        <div className="button_container">
          <button type="button" onClick={handleSubmit} className="button">
            Guardar
          </button>
        </div>
      </main>
    </div>
  );
}

export default CreateUser;
