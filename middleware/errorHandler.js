const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message || "Server Error" });
};

module.exports =  {
    errorHandler
};