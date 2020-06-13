import React, { useContext } from "react";
import { StoreContext } from "./StoreProvider";
import { useObserver } from "mobx-react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../assets/styles/Home.css";

function Home() {
  const store = useContext(StoreContext);

  return useObserver(() => (
    <div className="App-header">
      <h1>{store.counter}</h1>
      <div>
        <Button
          color="danger"
          size="lg"
          className="button counter"
          onClick={() => store.counter--}
        >
          -
        </Button>
        <Button
          color="danger counter"
          size="lg"
          className="button"
          onClick={() => store.counter++}
        >
          +
        </Button>
      </div>

      <Link to="/time" className="links">
        <Button color="primary" size="sm">
          Time
        </Button>
      </Link>
    </div>
  ));
}

export default Home;
