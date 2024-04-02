import { useContext, useEffect } from "react";
import AccountList from "./AccountList.js";
import AccountSummary from "./AccountSummary.js";
import { accountContext } from "../context/AccountContext/AccountContext.js";

const AccountDashboard = () => {
  const { fetchAccountsAction, accounts, error } = useContext(accountContext);

  //dispatch action
  useEffect(() => {
    fetchAccountsAction();
  }, []);

  let totalIncome = 0;
  let totalExpenses = 0;
  let totalInitialBalance = 0;

  accounts?.forEach((account) => {
    totalInitialBalance += account.initialBalance;
    account.transactions?.forEach((transaction) => {
      if (transaction.transactionType === "Income") {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
    });
  });

  return (
    <>
      {error ? (
        <>
          <div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong> {""}
            <span className="block sm:inline ">{error}</span>
          </div>
        </>
      ) : (
        <>
          <AccountSummary
            balance={totalInitialBalance}
            income={totalIncome}
            expenses={totalExpenses}
          />
          <AccountList accounts={accounts} />
        </>
      )}
    </>
  );
};

export default AccountDashboard;
