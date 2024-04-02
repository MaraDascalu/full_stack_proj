import React, { createContext, useReducer } from "react";
import axios from "axios";
import {
  TRANSACTION_CREATION_SUCCES,
  TRANSACTION_CREATION_FAIL,
} from "./transactionsActionTypes.js";
import { API_URL_TRANSACTION } from "../../../utils/apiURL.js";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
};
const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // Create
    case TRANSACTION_CREATION_SUCCES:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  //create account
  const createTransactionAction = async (accountData) => {
    //header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };

    try {
      //request
      const res = await axios.post(API_URL_TRANSACTION, accountData, config);
      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_CREATION_SUCCES, payload: res?.data });
      }

      // Redirect
      window.location.href = `/account-details/${accountData?.accountId}`;
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <transactionContext.Provider
      value={{
        createTransactionAction,
        transaction: state.transaction,
        transactions: state.transactions,
        error: state?.error,
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};
