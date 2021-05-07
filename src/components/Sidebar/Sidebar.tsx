import { Link } from "react-router-dom";
import ExitIcon from "../../assets/svg/exit.svg";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/">
        <img src="/img/logo.png" alt="logo" className="sidebar_logo" />
      </Link>
      <div className="sidebar_sections">
        <p className="sidebar_text--title">Panel</p>
        <p className="sidebar_text--section">Dar de alta</p>
        <Link to="/create/user" className="sidebar_link">
          <p className="sidebar_text--default">Usuario</p>
        </Link>
        <p className="sidebar_text--default">Tipo de cliente</p>
        <p className="sidebar_text--default">Proyecto</p>
        <p className="sidebar_text--default mb-5">Maquinaria disponible</p>
        <p className="sidebar_text--section">Ver datos</p>
        <p className="sidebar_text--default">Ver todo</p>
        <p className="sidebar_text--default">Por periodo</p>
        <p className="sidebar_text--default">Por cliente</p>
        <p className="sidebar_text--default">Por empleado</p>
        <p className="sidebar_text--default mb-6">Por maquinaria</p>
        <div className="sidebar_exit mb-4">
          <img src={ExitIcon} alt="Icon de cerrar sesion" />
          <p className="sidebar_exit--text">Salir</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
