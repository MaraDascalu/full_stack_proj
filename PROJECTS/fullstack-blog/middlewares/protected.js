const isAuthenticated = (req, res, next) => {
  const id = req.session.userAuth ? req.session.userAuth : null;

  if (id) {
    return next();
  } else {
    res.render("users/notAuthorize");
  }
};

export default isAuthenticated;
