import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CreateUser, Home, Login } from "./pages";

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
