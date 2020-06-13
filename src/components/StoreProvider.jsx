import React from "react";
import { useLocalStore } from "mobx-react";

export const StoreContext = React.createContext();

//store for all the states managed in the application
function StoreProvider({ children }) {
  const store = useLocalStore(() => ({
    counter: 0,
    time: new Date().toLocaleTimeString(),
    data: {
      content: [],
      isLoading: true,
    },
    currency: {
      fromName: "$ U.S. Dollar",
      toName: "₹ Indian Rupee",
      from: "USD",
      to: "INR",
      conversionType: "USD_INR",
      multiplier: "",
      fromValue: 1,
      toValue: "",
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export default StoreProvider;
