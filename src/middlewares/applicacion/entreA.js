function entreA(req, res, next) {
  console.log("Entre a: " + req.originalUrl);
  next();
}

module.exports = entreA;