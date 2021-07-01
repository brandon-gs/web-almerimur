import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Loader } from "..";
import ExitIcon from "../../assets/svg/exit.svg";
import "./Sidebar.css";

function Sidebar() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const enableLoading = () => setIsLoading(true);

  const logout = () => {
    enableLoading();
    localStorage.removeItem("token");
    history.push("/login");
  };

  const getTextClass = (route: string) =>
    route === location.pathname ? "active" : "default";

  return (
    <aside className="sidebar">
      {isLoading && <Loader />}
      <Link to="/">
        <img src="/img/logo.png" alt="logo" className="sidebar_logo" />
      </Link>
      <div className="sidebar_sections">
        <p className="sidebar_text--title">Panel</p>
        <p className="sidebar_text--section">Dar de alta</p>
        <Link to="/create/user" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/create/user")}`}>
            Usuario
          </p>
        </Link>
        <Link to="/create/client" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/create/client")}`}>
            Tipo de cliente
          </p>
        </Link>
        <Link to="/create/project" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/create/project")}`}>
            Proyecto
          </p>
        </Link>
        <Link to="/create/machine" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/create/machine")}`}>
            Maquinaria
          </p>
        </Link>
        <Link to="/create/rechange" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/create/rechange")}`}>
            Recambio
          </p>
        </Link>
        <p className="sidebar_text--section">Ver datos</p>
        <Link to="/filters" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/filters")}`}>
            Ver todo
          </p>
        </Link>
        <Link to="/filters/period" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/filters/period")}`}>
            Por periodo
          </p>
        </Link>
        <Link to="/filters/client" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/filters/client")}`}>
            Por cliente
          </p>
        </Link>
        <Link to="/filters/employee" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/filters/employee")}`}>
            Por empleado
          </p>
        </Link>
        <Link to="/filters/machine" className="sidebar_link">
          <p className={`sidebar_text--${getTextClass("/filters/machine")}`}>
            Por maquinaria
          </p>
        </Link>
        <div className="sidebar_exit mb-4" onClick={() => logout()}>
          <img src={ExitIcon} alt="Icon de cerrar sesion" />
          <p className="sidebar_exit--text">Salir</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
