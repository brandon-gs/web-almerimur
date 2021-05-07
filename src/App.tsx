import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CreateUser, Home, Login } from "./pages";

function App() {
  const token = localStorage.getItem("token");

  const routes = [
    {
      path: "/",
      component: token ? Home : Login,
    },
    {
      path: "/create/user",
      component: CreateUser,
    },
    {
      path: "/dashboard",
      component: Home,
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
