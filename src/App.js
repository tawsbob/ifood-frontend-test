import React from 'react';
import Home from './pages/Home'
import Login from './pages/Login'
import AppContextProvider from './components/ContextProvider'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const WithContext = ( Comp, path )=> {
  return (
      <Route exact path={path}>
          <Comp />
      </Route>
  )
}
function App() {
  return (
      <Router>
        <Switch>
          <AppContextProvider>
          { WithContext(Home, '/') }
          { WithContext(Login, '/Login') }
          </AppContextProvider>
        </Switch>
      </Router>

  );
}

export default App;
