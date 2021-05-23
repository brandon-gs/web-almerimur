import React, { useCallback, useEffect, useState } from "react";
import { Input, List, Sidebar, Alert, Loader } from "../../components";
import { CreateClientValues } from "src/@types/client";
import { StateAlert } from "src/components/Alert/Alert";
import { useHistory } from "react-router-dom";
import {
  createClient,
  deleteClient,
  getClients,
  putClient,
} from "src/api/client.api";
import "./CreateClient.css";
import { changeNameKeyFromArray } from "src/helpers/objects";
import { Item } from "src/components/List/ListItem/ListItem";

const defaultValues: CreateClientValues = {
  name: "",
};

function CreateClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [values, setValues] = useState<CreateClientValues>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<StateAlert>({
    message: "",
    type: "success",
    show: false,
  });

  const history = useHistory();
  const token = localStorage.getItem("token");

  // Loader change
  const enableLoading = () => setIsLoading(true);
  const disableLoading = () => setIsLoading(false);

  // Update client
  const updateClient = async (client: Item) => {
    enableLoading();
    const { error, message } = await putClient(client);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiClients();
      setServerError({
        message,
        type: "success",
        show: true,
      });
    }
    disableLoading();
  };

  // Delete client
  const deleteClientById = async (id: string) => {
    enableLoading();
    const { error, message } = await deleteClient(id);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiClients();
      setServerError({
        message,
        type: "success",
        show: true,
      });
    }
    disableLoading();
  };

  // Get clients saved on bd
  const getApiClients = useCallback(async () => {
    enableLoading();
    const { data } = await getClients();
    if (data && data.clients) {
      let _clients = changeNameKeyFromArray(
        data.clients,
        "client_name",
        "name"
      );
      _clients = changeNameKeyFromArray(data.clients, "client_id", "id");
      setClients(_clients.reverse());
    }
    disableLoading();
  }, []);

  useEffect(() => {
    getApiClients();
  }, [getApiClients]);

  const updateErrors = (errors: Record<string, string>) => setErrors(errors);

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
        const response = await createClient(values);
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
          message: "Cliente dado de alta.",
          type: "success",
          show: true,
        });
        await getApiClients();
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

  // Redirect if has not auth
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
            <p className="panel_text mb-5">Tipo de cliente</p>
            <Input
              type="text"
              name="name"
              placeholder="Nombre del cliente"
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
          <List
            title="Lista de clientes"
            items={clients}
            onUpdate={updateClient}
            onDelete={deleteClientById}
          />
        </section>
      </main>
    </div>
  );
}

export default CreateClient;
