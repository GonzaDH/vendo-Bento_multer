module.exports = function (req, res, next) {
    console.log("La sesion es: " + req.session.usuario)
    next();
}