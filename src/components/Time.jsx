import React, { useContext } from "react";
import { StoreContext } from "./StoreProvider";
import { useObserver } from "mobx-react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function Time() {
  const store = useContext(StoreContext);

  setInterval(() => {
    store.time = new Date().toLocaleTimeString();
  }, 1000);

  return useObserver(() => (
    <div className="App-header">
      <h1>{store.time}</h1>
      <div className="links">
        <Link to="/home">
          <Button color="primary" size="sm" className="button">
            Home
          </Button>
        </Link>
        <Link to="/data">
          <Button color="primary" size="sm" className="button">
            Data
          </Button>
        </Link>
      </div>
    </div>
  ));
}

export default Time;
