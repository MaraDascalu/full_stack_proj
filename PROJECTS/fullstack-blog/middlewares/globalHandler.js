const globalErrorHandler = (err, req, res, next) => {
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({
    status,
    message: err.message,
    stack: err.stack,
  });
};

export { globalErrorHandler };
