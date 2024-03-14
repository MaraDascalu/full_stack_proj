import Account from "../model/Account.js";
import User from "../model/User.js";

const createAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return next(new Error("User not found!"));
    }

    const { name, accountType, initialBalance, notes } = req.body;
    if (!name || !accountType || !notes) {
      return next(new Error("Name, account type and notes are required!"));
    }

    // * create new accout
    const newAccount = await Account.create({
      name,
      accountType,
      initialBalance,
      notes,
      createdBy: req.user,
    });

    // * add new account to user's accounts array
    const updateUser = await User.findByIdAndUpdate(req.user, {
      $push: { accounts: newAccount._id },
      hasCreatedAccount: true,
    });

    res.json({
      status: "success",
      data: newAccount,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const getAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    // * find account by id
    const account = await Account.findById(id).populate("transactions");
    if (!account) {
      return next(new Error("The account was not found!"));
    }

    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    // * delete account
    const deleteAccount = await Account.findByIdAndDelete(id);

    if (!deleteAccount) {
      return next(new Error("The account was not found!"));
    }

    // * remove account from user's accounts array
    const updateUser = await User.findByIdAndUpdate(req.user, {
      $pull: { accounts: id.toString() },
    });

    res.json({
      status: "success",
      message: "Account deleted successfully!",
    });
  } catch (error) {
    next(new Error(error));
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateArray = Object.entries(req.body);
    // * remove empty strings from update form
    const filterUpdateArray = updateArray.filter(([key, value]) => {
      return value !== "";
    });
    let updateObj = Object.fromEntries(filterUpdateArray);

    // * update the account
    const updatedAccount = await Account.findByIdAndUpdate(id, updateObj, {
      new: true,
      runValidators: true,
    });

    if (!updatedAccount) {
      return next(new Error("The account was not found!"));
    }

    res.json({
      status: "success",
      data: updatedAccount,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export { createAccount, deleteAccount, getAccount, updateAccount };
