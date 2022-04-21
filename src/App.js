import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import MaterialUiSettings from "./material-ui";
import React from "react";
import { defaultLanguages, setupI18N } from './i18n';
import { Router, Switch } from "react-router-dom";
import ShoppingList from "./views/ShoppingList";
import SignIn from "./views/SignIn";
import { createBrowserHistory } from 'history';
import AuthenticationProvider from "./context/AuthenticationProvider";
import PrivateRoute from "./PrivateRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import { SnackbarProvider } from "notistack";

function App() {

  const theme = createTheme(MaterialUiSettings.theme);
  const history = createBrowserHistory();

  React.useEffect(function loadTranslations() {
    setupI18N(defaultLanguages, "en-NZ");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <SnackbarProvider maxSnack={3}>
        <AuthenticationProvider>
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path={"/list"} component={ShoppingList} />
              <UnauthenticatedRoute exact path={["/", "/login"]} component={SignIn} />
            </Switch>
          </Router>
        </AuthenticationProvider>
      </SnackbarProvider>

    </ThemeProvider>
  );
}

export default App;