import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAccount from "./components/Forms/AddAccount.js";
import AccountDashboard from "./components/Dashbaord/AccountDashboard.js";
import AccountDetails from "./components/Dashbaord/AccountDetails.js";
import AddTransaction from "./components/Forms/AddTransaction.js";
import Login from "./components/Forms/Login.js";
import HomePage from "./components/HomePage/HomePage.js";
import Register from "./components/Forms/Register.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-transaction/:accountId"
          element={<AddTransaction />}
        />
        <Route path="/dashboard" element={<AccountDashboard />} />
        <Route
          path="/account-details/:accountID"
          element={<AccountDetails />}
        />
        <Route path="/add-account" element={<AddAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
