import React from "react";
import "./App.css";
import Home from "./components/Home";
import Time from "./components/Time";
import Data from "./components/Data";
import Currency from "./components/Currency";
import StoreProvider from "./components/StoreProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Switch>
            <Redirect exact from="/" to="home" />
            <Route path="/home" exact component={Home} />
            <Route path="/time" exact component={Time} />
            <Route path="/data" exact component={Data} />
            <Route path="/currency" exact component={Currency} />
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
