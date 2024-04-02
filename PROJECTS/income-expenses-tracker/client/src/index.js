import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./components/context/AuthContext/AuthContext.js";
import { AccountContextProvider } from "./components/context/AccountContext/AccountContext.js";
import { TransactionContextProvider } from "./components/context/TransactionContext/TransactionsContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <AccountContextProvider>
      <TransactionContextProvider>
        <App />
      </TransactionContextProvider>
    </AccountContextProvider>
  </AuthContextProvider>
);
