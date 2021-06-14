import React, { useCallback, useEffect, useState } from "react";
import { Input, List, Loader, Sidebar } from "../../components";
import { CreateClientValues } from "src/@types/client";
import Alert from "src/components/Alert";
import { StateAlert } from "src/components/Alert/Alert";
import { useHistory } from "react-router-dom";
import "./CreateMachine.css";
import { changeNameKeyFromArray } from "src/helpers/objects";
import {
  createMachine,
  deleteMachine,
  getMachines,
  putMachine,
} from "src/api/machine.api";
import { Item } from "src/components/List/ListItem/ListItem";

const defaultValues: CreateClientValues = {
  name: "",
};

function CreateMachine() {
  const [isLoading, setIsLoading] = useState(false);
  const [machines, setMachines] = useState([]);
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
  const getApiMachines = useCallback(async () => {
    enableLoading();
    const { data } = await getMachines();
    if (data) {
      if (data.machines) {
        let _machines = changeNameKeyFromArray(
          data.machines,
          "machine_name",
          "name"
        );
        _machines = changeNameKeyFromArray(data.machines, "machine_id", "id");
        setMachines(_machines.reverse());
      } else {
        setMachines([]);
      }
    }

    disableLoading();
  }, []);

  useEffect(() => {
    getApiMachines();
  }, [getApiMachines]);

  // Update client
  const updateMachine = async (machine: Item) => {
    enableLoading();
    const { error, message } = await putMachine(machine);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiMachines();
      setServerError({
        message,
        type: "success",
        show: true,
      });
    }
    disableLoading();
  };

  // Delete client
  const deleteMachineById = async (id: string) => {
    enableLoading();
    const { error, message } = await deleteMachine(id);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiMachines();
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
        const response = await createMachine(values);
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
          message: "Maquina dada de alta.",
          type: "success",
          show: true,
        });
        await getApiMachines();
      } catch (error) {
        setServerError({
          message: "Error al dar de alta al cliente, intente más tarde.",
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
            <p className="panel_text mb-5">Maquinaria disponible</p>
            <Input
              type="text"
              name="name"
              placeholder="Nombre de la maquina"
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
          {machines && (
            <List
              emptyMessage="No hay maquinas dadas de alta"
              title="Lista de maquinas"
              items={machines}
              onUpdate={updateMachine}
              onDelete={deleteMachineById}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default CreateMachine;
