import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import MaterialUiSettings from "./material-ui";
import React, { Suspense } from "react";
import { defaultLanguages, setupI18N } from './i18n';
import { Router, Switch, Route } from "react-router-dom";
import ShoppingList from "./views/ShoppingList";
import { createBrowserHistory } from 'history';
import AccountProvider from "./context/AccountProvider";

function App() {

  const theme = createMuiTheme(MaterialUiSettings.theme);
  const history = createBrowserHistory();

  React.useEffect(() => {
    setupI18N(defaultLanguages, "en-NZ");
  }, []);

  return (
    <>
      <Suspense fallback={<>...</>}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AccountProvider>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={ShoppingList} />
                <Route component={ShoppingList} />
              </Switch>
            </Router>
          </AccountProvider>

        </ThemeProvider>
      </Suspense>
    </>
  );
}

export default App;