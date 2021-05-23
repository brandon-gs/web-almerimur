import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  CreateClient,
  CreateMachine,
  CreateProject,
  CreateUser,
  Home,
  Login,
} from "./pages";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const routes = [
    {
      path: "/",
      component: Home,
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
