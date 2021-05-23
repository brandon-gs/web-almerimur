import React, { useCallback, useEffect, useState } from "react";
import { Input, List, Loader, Sidebar } from "../../components";
import { CreateClientValues } from "src/@types/client";
import Alert from "src/components/Alert";
import { StateAlert } from "src/components/Alert/Alert";
import { useHistory } from "react-router-dom";
import "./CreateProject.css";
import { Item } from "src/components/List/ListItem/ListItem";
import {
  createProject,
  deleteProject,
  getProjects,
  putProject,
} from "src/api/project.api";
import { changeNameKeyFromArray } from "src/helpers/objects";

const defaultValues = {
  name: "",
};

function CreateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
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
  const getApiProjects = useCallback(async () => {
    enableLoading();
    const { data } = await getProjects();
    if (data && data.projects) {
      let _projects = changeNameKeyFromArray(
        data.projects,
        "project_name",
        "name"
      );
      _projects = changeNameKeyFromArray(data.projects, "project_id", "id");
      setProjects(_projects.reverse());
    }
    disableLoading();
  }, []);

  useEffect(() => {
    getApiProjects();
  }, [getApiProjects]);

  // Update client
  const updateProject = async (project: Item) => {
    enableLoading();
    const { error, message } = await putProject(project);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiProjects();
      setServerError({
        message,
        type: "success",
        show: true,
      });
    }
    disableLoading();
  };

  // Delete client
  const deleteProjectById = async (id: string) => {
    enableLoading();
    const { error, message } = await deleteProject(id);
    if (error) {
      setServerError({
        message,
        type: "danger",
        show: true,
      });
    } else {
      await getApiProjects();
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
        const response = await createProject(values);
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
        await getApiProjects();
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
            <p className="panel_text mb-5">Proyecto</p>
            <Input
              type="text"
              name="name"
              placeholder="Nombre del proyecto"
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
          {projects && (
            <List
              title="Lista de proyectos"
              items={projects}
              onUpdate={updateProject}
              onDelete={deleteProjectById}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default CreateProject;
