const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

const leerJson = () => {
    let jsonUsers = fs.readFileSync(path.resolve(__dirname + "/../data/usersDb.json"));

    return JSON.parse(jsonUsers);
}

const controller = {
    showRegister: (req, res) => {
        res.render("register");
    },
    processRegister: (req, res) => {

        let passwordHash = bcrypt.hashSync(req.body.password, 10);
        
        // res.send(req.body)

        let usuario = {
            email: req.body.email,
            password: passwordHash
        }

        let usuarios = leerJson();

        usuarios.push(usuario);

        usuarios = JSON.stringify(usuarios, null, " ");

        fs.writeFileSync(path.resolve(__dirname + "/../data/usersDb.json"), usuarios);

        res.redirect("/login");
        
    },
    showLogin: (req, res) => {
        res.render("login");
    },
    processLogin: (req, res) => {

        let resultado = validationResult(req);

        // Usuario exista y la contraseña sea correcta
        if(resultado.isEmpty()){
            let usuarios = leerJson();
            let usuarioEncontrado = usuarios.find(usuario => usuario.email == req.body.email);
    
            let emailDelUsuario = usuarioEncontrado.email
            req.session.usuario = emailDelUsuario;
    
            if(req.body.rememberme != undefined){
                // Quiero crear la cookie
                res.cookie("recordame", usuarioEncontrado.email, { maxAge: 1000 * 60 });
            }
    
            res.redirect('/products');
        } else {
            res.render("login", { error: resultado.errors[0].msg, oldEmail: req.body.email });
        }
    },
    logout: (req, res) => {
        req.session.destroy();

        res.clearCookie("recordame");

        res.redirect("/products");
    }
}

module.exports = controller;