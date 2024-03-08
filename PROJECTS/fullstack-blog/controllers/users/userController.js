import bcrypt from "bcrypt";
import appError from "../../utils/appError.js";
import User from "../../model/user/User.js";

const userRegister = async (req, res, next) => {
  try {
    // * check if user exists (by email)
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.render("users/register", {
        error: "All fields are required!",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.render("users/register", {
        error: "User already exists!",
      });
    }

    // * hash the password
    const hashSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, hashSalt);

    // * create the user
    const userCreate = await User.create({
      fullname,
      email,
      password: hashPassword,
    });

    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    next(appError(error.message));
  }
};

const userLogin = async (req, res, next) => {
  try {
    // * check for credentials
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render("users/login", {
        error: "Email and password are required!",
      });
    }
    const userExists = await User.findOne({ email });
    if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
      return res.render("users/login", {
        error: "Invalid credentials!",
      });
    }

    // * save the user in current session
    req.session.userAuth = userExists._id;

    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    next(appError(error.message));
  }
};

const userLogout = async (req, res, next) => {
  try {
    req.session.destroy();

    res.redirect("/");
  } catch (error) {
    next(appError(error.message));
  }
};

const returnUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      res.json({
        status: "success",
        data: user,
      });
    } else {
      next(appError("Invalid user ID!"));
    }
  } catch (error) {
    return next(appError(error.message));
  }
};

const userProfile = async (req, res, next) => {
  try {
    const userId = req.session.userAuth;
    const userProfile = await User.findById(userId).populate("posts");

    res.render("users/profile", { user: userProfile });
  } catch (error) {
    next(appError(error.message));
  }
};

const uploadProfilePhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.render("users/uploadProfilePhoto", {
        error: "You need to upload a photo first!",
      });
    }

    // * update profile picture
    const user = await User.findByIdAndUpdate(
      req.session.userAuth,
      {
        profileImage: req.file.path,
      },
      { new: true }
    );

    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    next(appError(error.message));
  }
};

const uploadCoverPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.render("users/uploadCoverPhoto", {
        error: "You need to upload a photo first!",
      });
    }

    // * update profile picture
    const user = await User.findByIdAndUpdate(
      req.session.userAuth,
      {
        coverImage: req.file.path,
      },
      { new: true }
    );

    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    next(appError(error.message));
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { fullname, email } = req.body;

    // * check is email is already taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return res.render("users/updateProfile", {
          error: "This email is already taken!",
        });
      }
    }

    // * update the user
    const userUpdate = await User.findByIdAndUpdate(
      req.session.userAuth,
      {
        fullname,
        email,
      },
      { new: true }
    );

    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    return next(appError(error.message));
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (password) {
      const hashSalt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, hashSalt);
      const userUpdate = await User.findByIdAndUpdate(
        req.session.userAuth,
        {
          password: hashPass,
        },
        { new: true }
      );

      res.render("users/updatePassword", {
        message: "Your password was successfully updated",
        error: "",
      });
    } else {
      res.render("users/updatePassword", {
        error: "You need to provide a password!",
        message: "",
      });
    }
  } catch (error) {
    return next(appError(error.message));
  }
};

export {
  returnUser,
  updateUserPassword,
  updateUserProfile,
  uploadCoverPhoto,
  uploadProfilePhoto,
  userLogin,
  userLogout,
  userProfile,
  userRegister,
};
