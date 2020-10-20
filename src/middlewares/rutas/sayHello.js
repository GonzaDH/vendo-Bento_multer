function sayHello(req, res, next) {
  console.log("Hola");
  next();
}

module.exports = sayHello;