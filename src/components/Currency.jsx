import React, { useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "./StoreProvider";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import {
  Input,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
} from "reactstrap";
import "../assets/styles/Currency.css";

export default function Currency() {
  const { currency } = useContext(StoreContext);

  const currencyList = [
    { currency: "XCD", name: "East Caribbean dollar", symbol: "$" },
    { currency: "EUR", name: "European euro", symbol: "€" },
    { currency: "GEL", name: "Georgian lari", symbol: "₾" },
    { currency: "HTG", name: "Haitian gourde", symbol: "G" },
    { currency: "INR", name: "Indian rupee", symbol: "₹" },
    { currency: "ILS", name: "Israeli new sheqel", symbol: "₪" },
    { currency: "KZT", name: "Kazakhstani tenge", symbol: "лв" },
    { currency: "KWD", name: "Kuwaiti dinar", symbol: "د.ك" },
    { currency: "LSL", name: "Lesotho loti", symbol: "L" },
    { currency: "USD", name: "U.S. Dollar", symbol: "$" },
  ];

  const handleClick = (pickedCurrency, type) => {
    if (type === "from") {
      currency.fromName = `${pickedCurrency.symbol} ${pickedCurrency.name}`;
      currency.from = pickedCurrency.currency;
    } else if (type === "to") {
      currency.toName = `${pickedCurrency.symbol} ${pickedCurrency.name}`;
      currency.to = pickedCurrency.currency;
    }
  };

  useEffect(() => {
    currency.conversionType = `${currency.from}_${currency.to}`;
    axios
      .get(
        `https://free.currconv.com/api/v7/convert?q=${currency.conversionType}&compact=ultra&apiKey=dd8e835c3d0a875afe5e`
      )
      .then((res) => {
        currency.multiplier = res.data[currency.conversionType];
        currency.toValue = currency.fromValue * currency.multiplier;
      });
  });

  return useObserver(() => (
    <div className="App-header">
      <div className="pick-currency">
        <Input
          type="number"
          onChange={(event) => {
            currency.fromValue = event.target.value;
          }}
          value={currency.fromValue}
        />

        <UncontrolledButtonDropdown className="dropdown">
          <DropdownToggle caret color="info" className="dropdown-btn">
            {currency.fromName}
          </DropdownToggle>
          <DropdownMenu>
            {currencyList.map((item) => (
              <DropdownItem
                key={item.currency}
                onClick={() => handleClick(item, "from")}
              >
                {item.symbol} {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>

      <h1> TO </h1>

      <div className="pick-currency">
        <Input
          type="number"
          onChange={(event) => {
            currency.toValue = event.target.value;
          }}
          value={currency.toValue}
        />

        <UncontrolledButtonDropdown className="dropdown">
          <DropdownToggle caret color="info" className="dropdown-btn">
            {currency.toName}
          </DropdownToggle>
          <DropdownMenu>
            {currencyList.map((item) => (
              <DropdownItem
                key={item.currency}
                onClick={() => handleClick(item, "to")}
              >
                {item.symbol} {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>

      <div className="links">
        <Link to="/data">
          <Button color="primary" size="sm" className="button">
            Data
          </Button>
        </Link>
        <Link to="/home">
          <Button color="primary" size="sm" className="button">
            Home
          </Button>
        </Link>
      </div>
    </div>
  ));
}
