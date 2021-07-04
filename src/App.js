import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import MaterialUiSettings from "./material-ui";
import React, { Suspense } from "react";
import { defaultLanguages, setupI18N } from './i18n';
import { Router, Switch, Route } from "react-router-dom";
import ShoppingList from "./views/ShoppingList";
import SignIn from "./views/SignIn";
import { createBrowserHistory } from 'history';
import AuthenticationProvider from "./context/AuthenticationProvider";
import PrivateRoute from "./PrivateRoute";
import { useTranslation } from 'react-i18next';

function App() {

  const theme = createMuiTheme(MaterialUiSettings.theme);
  const history = createBrowserHistory();
  const { t } = useTranslation();

  React.useEffect(function loadTranslations() {
    setupI18N(defaultLanguages, "en-NZ");
  }, []);

  return (
    <>
      <Suspense fallback={<>{t('loading')}</>}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AuthenticationProvider>
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path={["/", "/items", "/list"]} component={ShoppingList} />
                <Route exact path={["/login", "/signin", "/sign-in"]} component={SignIn} />
              </Switch>
            </Router>
          </AuthenticationProvider>

        </ThemeProvider>
      </Suspense>
    </>
  );
}

export default App;