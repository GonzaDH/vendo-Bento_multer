const { body } = require("express-validator");
var path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const leerJson = () => {
  let jsonUsers = fs.readFileSync(path.resolve(__dirname + "./../../data/usersDb.json"));

  return JSON.parse(jsonUsers);
}

module.exports = {
  product: [
    body("name")
      .notEmpty()
      .withMessage("El campo de nombre es obligatorio")
      .bail()
      .isLength({ min: 5, max: 20 })
      .withMessage("Minimo 5, maximo 20"),
    body("price")
      .notEmpty()
      .withMessage("El campo de nombre es obligatorio")
      .isFloat()
      .withMessage("El campo debe ser un número"),
    body("image")
      .custom(function(value, { req }){

        if(req.file != undefined){
          return true;
        }
        return false;
      })
      .withMessage("Imagen obligatoria")
      .bail()
      .custom(function(value, { req }){

        let ext = path.extname(req.file.originalname);

        if(ext == ".jpg" || ext == ".jpeg" || ext == ".png") {
          return true;
        }
        return false;
      })
      .withMessage("Imagen incorrecta")
  ],
  login: [
    body("email")
      .custom(function(value, { req }){

        if(value){

          let users = leerJson();

          let usuarioEncontrado = users.find(user => user.email == req.body.email)

          if(usuarioEncontrado){

            let resultado = bcrypt.compareSync(req.body.password, usuarioEncontrado.password);

            if(resultado){
              return true;
            } else {
              return false;
            }

          } else {
            return false;
          }

        } else {
          
          return false;
        }

      })
      .withMessage("El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo."),
  ]
};