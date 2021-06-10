import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  CreateClient,
  CreateMachine,
  CreateProject,
  CreateUser,
  CreateRechange,
  Login,
  Filters,
  FiltersPeriod,
  FiltersClient,
  FiltersEmployee,
  FiltersMachine,
  CreateVehicle,
  FiltersVehicle,
} from "./pages";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const routes = [
    {
      path: "/",
      component: Filters,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/create/user",
      component: CreateUser,
    },
    {
      path: "/create/client",
      component: CreateClient,
    },
    {
      path: "/create/project",
      component: CreateProject,
    },
    {
      path: "/create/machine",
      component: CreateMachine,
    },
    {
      path: "/create/vehicle",
      component: CreateVehicle,
    },
    {
      path: "/create/rechange",
      component: CreateRechange,
    },
    {
      path: "/filters",
      component: Filters,
    },
    {
      path: "/filters/period",
      component: FiltersPeriod,
    },
    {
      path: "/filters/client",
      component: FiltersClient,
    },
    {
      path: "/filters/employee",
      component: FiltersEmployee,
    },
    {
      path: "/filters/machine",
      component: FiltersMachine,
    },
    {
      path: "/filters/vehicle",
      component: FiltersVehicle,
    },
  ];

  return (
    <Router>
      <Switch>
        {routes.map((router) => (
          <Route
            key={router.path}
            exact
            path={router.path}
            component={router.component}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
