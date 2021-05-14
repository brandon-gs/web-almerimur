import { useHistory } from "react-router";
import { Sidebar } from "src/components";

function Home() {
  const history = useHistory();

  const token = localStorage.getItem("token");
  if (!token) {
    history.push("/login");
    return null;
  }

  return (
    <div className="page">
      <Sidebar />
      <h1>Pagina de inicio</h1>
    </div>
  );
}

export default Home;
