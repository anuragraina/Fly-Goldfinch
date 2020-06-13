import React, { useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "./StoreProvider";
import { useObserver } from "mobx-react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function Data() {
  const { data } = useContext(StoreContext);

  useEffect(() => {
    axios
      .get(
        "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
      )
      .then((res) => {
        data.content = res.data;
        data.isLoading = false;
      });
  }, [data]);

  const displayData = () => {
    if (data.isLoading === true) return <div>Loading...</div>;
    else
      return (
        <ul>
          {data.content.map((item, index) => (
            <li key={index}>
              {item.first} {item.last}
            </li>
          ))}
        </ul>
      );
  };

  return useObserver(() => (
    <div className="App-header">
      {displayData()}
      <div className="links">
        <Link to="/time">
          <Button color="primary" size="sm" className="button">
            Time
          </Button>
        </Link>
        <Link to="/currency">
          <Button color="primary" size="sm" className="button">
            Currency
          </Button>
        </Link>
      </div>
    </div>
  ));
}

export default Data;
