import Account from "../model/Account.js";
import Transaction from "../model/Transaction.js";

const createTransaction = async (req, res, next) => {
  try {
    const { name, transactionType, amount, category, notes, accountId } =
      req.body;

    // * create the transaction
    const newTransaction = await Transaction.create({
      name,
      transactionType,
      amount,
      category,
      notes,
      createdBy: req.user,
    });

    // * add transaction to account's transactions array
    const updateAccount = await Account.findByIdAndUpdate(accountId, {
      $push: { transactions: newTransaction._id },
    });

    if (!updateAccount) {
      return next(new Error("Account not found!"));
    }

    res.json({
      status: "success",
      data: newTransaction,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    if (!transactions) {
      return next(new Error("No transaction was found!"));
    }
    res.json({
      status: "success",
      data: transactions,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return next(new Error("The transaction was not found!"));
    }

    res.json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { accountId } = req.body;

    // * delete transaction
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return next(new Error("The transaction was not found!"));
    }

    // * remove transaction from accont's transactions array
    const updateAccount = await Account.findByIdAndUpdate(accountId, {
      $pull: { transactions: id.toString() },
    });

    res.json({
      status: "success",
      message: "Transaction deleted successfully!",
    });
  } catch (error) {
    next(new Error(error));
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateArray = Object.entries(req.body);
    // * remove empty strings from update form
    const filterUpdateArray = updateArray.filter(([key, value]) => {
      return value !== "";
    });
    let updateObj = Object.fromEntries(filterUpdateArray);

    // * update transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      updateObj,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return next(new Error("the transaction was not found!"));
    }

    res.json({
      status: "success",
      data: updatedTransaction,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
};
