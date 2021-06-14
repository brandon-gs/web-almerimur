import React, { useCallback, useEffect, useState } from "react";
import { Input, List, Loader, Sidebar } from "../../components";
import { CreateClientValues } from "src/@types/client";
import Alert from "src/components/Alert";
import { StateAlert } from "src/components/Alert/Alert";
import { useHistory } from "react-router-dom";
import "./CreateVehicle.css";
import { Item } from "src/components/List/ListItem/ListItem";
import {
  createVehicle,
  getVehicles,
  putVehicle,
  deleteVehicle,
} from "src/api/vehicles.api";

const defaultValues = {
  name: "",
};

function CreateVehicle() {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [values, setValues] = useState<CreateClientValues>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<StateAlert>({
    message: "",
    type: "success",
    show: false,
  });

  const enableLoading = () => setIsLoading(true);
  const disableLoading = () => setIsLoading(false);
  const updateErrors = (errors: Record<string, string>) => setErrors(errors);

  // Get clients saved on bd
  const getApiVehicles = useCallback(async () => {
    enableLoading();
    const { data } = await getVehicles();
    if (data) {
      if (data.vehicles) {
        setVehicles(data.vehicles);
      } else {
        setVehicles([]);
      }
    }
    disableLoading();
  }, []);

  useEffect(() => {
    getApiVehicles();
  }, [getApiVehicles]);

  // Update vehicle
  const updateVehicle = async (vehicle: Item) => {
    enableLoading();
    const { error, message } = await putVehicle(vehicle);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiVehicles();
      setServerError({
        message,
        type: "success",
        show: true,
      });
    }
    disableLoading();
  };

  // Delete client
  const deleteVehicleById = async (id: string) => {
    enableLoading();
    const { error, message } = await deleteVehicle(id);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiVehicles();
      setServerError({
        message,
        type: "success",
        show: true,
      });
    }
    disableLoading();
  };

  const handleInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setErrors({ ...errors, [name]: "" });
      setValues({ ...values, [name]: event.target.value });
    };

  const getErrors = () => {
    let _errors = errors;
    let hasErrors = false;
    for (const key in values) {
      if (values[key as keyof CreateClientValues] === "" && key !== "image") {
        _errors[key as keyof CreateClientValues] = "Este campo es requerido";
        hasErrors = true;
      }
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
        const response = await createVehicle(values);
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
          message: "Vehículo dado de alta.",
          type: "success",
          show: true,
        });
        await getApiVehicles();
      } catch (error) {
        setServerError({
          message: "Error al dar de alta el vehículo, intente más tarde.",
          type: "danger",
          show: true,
        });
      }
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
      {isLoading && <Loader />}
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
            <p className="panel_text mb-5">Vehículo</p>
            <Input
              type="text"
              name="name"
              placeholder="Nombre del vehículo"
              className="mb-4"
              value={values.name}
              error={errors.name}
              onChange={handleInputChange("name")}
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="button button_column"
            >
              Guardar
            </button>
          </article>
          {vehicles && (
            <List
              emptyMessage="No hay vehículos dados de alta"
              title="Lista de vehículos"
              items={vehicles}
              onUpdate={updateVehicle}
              onDelete={deleteVehicleById}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default CreateVehicle;
