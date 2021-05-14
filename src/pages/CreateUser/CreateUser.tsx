import { useEffect, useRef, useState } from "react";
import "./CreateUser.css";
import edit from "../../assets/svg/edit.svg";
import { Input, SelectInput, Sidebar } from "../../components";
import { CreateUserValues } from "src/@types/user";
import { createUser } from "src/api/user.api";
import Alert from "src/components/Alert";
import { StateAlert } from "src/components/Alert/Alert";
import { useHistory } from "react-router-dom";

const defaultValues: CreateUserValues = {
  role: "Conductor",
  name: "",
  job: "",
  image: "/img/default_user.png",
  email: "",
  password: "",
  confirmPassword: "",
  contract: "",
  hourly: "",
  MAX_FILE_SIZE: "100000000",
};

function CreateUser() {
  const [values, setValues] = useState<CreateUserValues>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<StateAlert>({
    message: "",
    type: "success",
    show: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setValues({
        ...values,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
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
    if (!hasErrors && fileInputRef.current?.files) {
      try {
        const inputFile = fileInputRef.current.files[0];
        const response = await createUser(values, inputFile);
        if (response.error && response.message) {
          setServerError({
            message: response.message.toString(),
            type: "danger",
            show: true,
          });
          return;
        }
        setValues(defaultValues);
        setErrors({});
        setServerError({
          message: "Usuario creado",
          type: "success",
          show: true,
        });
      } catch (error) {
        setServerError({
          message: "Error al crear el usuario, intente más tarde.",
          type: "danger",
          show: true,
        });
      }
    } else if (values.image === defaultValues.image) {
      window.scrollTo({ top: 0 });
      setServerError({
        message: "Se debe seleccionar una imagen",
        type: "danger",
        show: true,
      });
    } else {
      window.scrollTo({ top: 0 });
      setServerError({
        message: "Todos los campos son requeridos.",
        type: "danger",
        show: true,
      });
    }
  };

  const onCloseAlert = () =>
    setServerError({ message: "", type: "danger", show: false });

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

  const history = useHistory();

  const token = localStorage.getItem("token");
  if (!token) {
    history.push("/login");
    return null;
  }

  return (
    <div className="page">
      <Alert
        show={serverError.show}
        message={serverError.message}
        type={serverError.type}
        onClose={onCloseAlert}
      />
      <Sidebar />
      <main className="panel">
        <section className="panel_columns">
          <article className="panel_column">
            <h1 className="panel_title mb-4">Dar de alta</h1>
            <p className="panel_text mb-5">Usuario</p>
            <Input
              type="hidden"
              placeholder="Max file size"
              name="MAX_FILE_SIZE"
              value={values.MAX_FILE_SIZE}
              onChange={handleInputChange("MAX_FILE_SIZE")}
            />
            <div className="panel_edit_image mb-4">
              <div className="image-upload">
                <label htmlFor="image">
                  <img
                    src={edit}
                    alt="Boton para editar"
                    className="panel_image_button"
                  />
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleUploadImage}
                  ref={fileInputRef}
                />
              </div>
              <img
                src={values.image}
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
