const errorHandler = (err, req, res, next) => {
  //Fånga alla statuskoder under 400 som felaktigt faller igenom till errorHandler.
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
