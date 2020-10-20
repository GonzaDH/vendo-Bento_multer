const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

const validator = require("../middlewares/rutas/validator");


// Url: /


//  Quiero MOSTRAR mi formulario de registro
router.get("/register", indexController.showRegister);

//  Quiero PROCESAR mi formulario de registro
router.post("/register", indexController.processRegister);

//  Quiero MOSTRAR mi formulario de login
router.get("/login", indexController.showLogin);

// Quiero PROCESAR mi formulario de login
router.post("/login", validator.login, indexController.processLogin);

router.post("/logout", indexController.logout);



module.exports = router;
