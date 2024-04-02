import { createContext, useReducer } from "react";
import axios from "axios";
import { API_URL_ACC, API_URL_USER } from "../../../utils/apiURL.js";
import {
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_CREATION_SUCCES,
  ACCOUNT_CREATION_FAIL,
  ACCOUNT_DELETE_SUCCES,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_FETCH_SUCCES,
  ACCOUNT_FETCH_FAIL,
} from "./accountActionTypes.js";

export const accountContext = createContext();

//Initial State
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  accounts: [],
  account: null,
  error: null,
};

//reducer
const accountReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // Details
    case ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        account: payload,
        error: null,
      };
    case ACCOUNT_DETAILS_FAIL:
      return {
        ...state,
        account: null,
        error: payload,
      };

    // Create
    case ACCOUNT_CREATION_SUCCES:
      return {
        ...state,
        account: payload,
        error: null,
      };
    case ACCOUNT_CREATION_FAIL:
      return {
        ...state,
        account: null,
        error: payload,
      };

    // Delete
    case ACCOUNT_DELETE_SUCCES:
      return {
        ...state,
        ...payload,
        error: null,
      };
    case ACCOUNT_DELETE_FAIL:
      return {
        ...state,
        error: payload,
      };

    // Fetch
    case ACCOUNT_FETCH_SUCCES:
      return {
        ...state,
        accounts: payload,
        error: null,
      };
    case ACCOUNT_FETCH_FAIL:
      return {
        ...state,
        accounts: null,
        error: payload,
      };

    default:
      return state;
  }
};

//Provider
export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);

  // Get all accounts Action
  const fetchAccountsAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };

    try {
      const res = await axios.get(`${API_URL_USER}/profile`, config);

      if (res?.data) {
        dispatch({
          type: ACCOUNT_FETCH_SUCCES,
          payload: res?.data?.data?.accounts,
        });
      }
    } catch (error) {
      dispatch({
        type: ACCOUNT_FETCH_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //Get account details action
  const getAccountDetailsAction = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(`${API_URL_ACC}/${id}`, config);

      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: ACCOUNT_DETAILS_SUCCESS,
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ACCOUNT_DETAILS_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };

  //Create account
  const createAccountAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };

    try {
      const res = await axios.post(`${API_URL_ACC}`, formData, config);
      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: ACCOUNT_CREATION_SUCCES,
          payload: res?.data?.data,
        });
      }

      // Redirect
      window.location.href = "/dashboard";
    } catch (error) {
      dispatch({
        type: ACCOUNT_CREATION_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };

  // Delete account
  const deleteAccountAction = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };

    try {
      const res = await axios.delete(`${API_URL_ACC}/${id}`, config);
      if (res?.data?.status === "success") {
        const remainAccounts = state?.accounts?.filter((account) => {
          return account._id !== id;
        });
        //dispatch
        dispatch({
          type: ACCOUNT_DELETE_SUCCES,
          payload: { accounts: remainAccounts },
        });
      }
    } catch (error) {
      //dispatch
      dispatch({
        type: ACCOUNT_DELETE_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };
  return (
    <accountContext.Provider
      value={{
        createAccountAction,
        deleteAccountAction,
        fetchAccountsAction,
        getAccountDetailsAction,
        account: state?.account,
        accounts: state?.accounts,
        error: state?.error,
      }}
    >
      {children}
    </accountContext.Provider>
  );
};
