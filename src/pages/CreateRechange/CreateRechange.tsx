import React, { useCallback, useEffect, useState } from "react";
import { Input, List, Loader, Sidebar } from "../../components";
import { CreateClientValues } from "src/@types/client";
import Alert from "src/components/Alert";
import { StateAlert } from "src/components/Alert/Alert";
import { useHistory } from "react-router-dom";
import "./CreateRechange.css";
import { changeNameKeyFromArray } from "src/helpers/objects";
import { RechangeValues } from "src/@types/rechange";
import {
  ItemRechange,
  putRechange,
  deleteRechangeById,
  getRechanges,
  createRechange,
} from "src/api/rechange.api";

const defaultValues: RechangeValues = {
  name: "",
  price: "",
};

function CreateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [rechanges, setRechanges] = useState([]);
  const [values, setValues] = useState<RechangeValues>(defaultValues);
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
  const getApiRechanges = useCallback(async () => {
    enableLoading();
    const { data } = await getRechanges();
    if (data) {
      if (data.rechanges) {
        let _rechanges = changeNameKeyFromArray(
          data.rechanges,
          "rechange_title",
          "name"
        );
        _rechanges = changeNameKeyFromArray(
          data.rechanges,
          "rechange_price",
          "price"
        );
        _rechanges = changeNameKeyFromArray(
          data.rechanges,
          "rechange_id",
          "id"
        );
        setRechanges(_rechanges.reverse());
      } else {
        setRechanges([]);
      }
    }
    disableLoading();
  }, []);

  useEffect(() => {
    getApiRechanges();
  }, [getApiRechanges]);

  // Update rechange
  const updateRechange = async (rechange: ItemRechange) => {
    enableLoading();
    const { error, message } = await putRechange(rechange);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiRechanges();
      setServerError({
        message,
        type: "success",
        show: true,
      });
    }
    disableLoading();
  };

  // Delete rechange
  const deleteRechange = async (id: string) => {
    enableLoading();
    const { error, message } = await deleteRechangeById(id);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiRechanges();
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
        const response = await createRechange(values);
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
          message: "Recambio dado de alta.",
          type: "success",
          show: true,
        });
        await getApiRechanges();
      } catch (error) {
        setServerError({
          message: "Error al dar de alta el recambio, intente más tarde.",
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
            <p className="panel_text mb-5">Recambio</p>
            <Input
              type="text"
              name="name"
              placeholder="Nombre del recambio"
              className="mb-4"
              value={values.name}
              error={errors.name}
              onChange={handleInputChange("name")}
            />
            <Input
              type="text"
              name="price"
              placeholder="Precio del recambio"
              className="mb-4"
              value={values.price}
              error={errors.price}
              onChange={handleInputChange("price")}
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="button button_column"
            >
              Guardar
            </button>
          </article>
          {rechanges && (
            <List
              title="Lista de recambios"
              items={rechanges}
              onUpdate={updateRechange as any}
              onDelete={deleteRechange}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default CreateProject;
