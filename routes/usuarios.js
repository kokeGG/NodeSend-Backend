const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");
const { check } = require("express-validator");

router.post("/",
    [   //middleware
        check("nombre", "El nombre es obligatorio").not().isEmpty(), //se definen las reglas de validación
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6})

    ],
  usuarioController.nuevoUsuario
);

module.exports = router;
