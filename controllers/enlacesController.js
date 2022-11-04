const Enlaces = require("../models/Enlace");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {
  console.log("desde nuevo enlace");

  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Crear un objeto de Enlace
  const { nombre_original, password } = req.body;

  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;
  enlace.password = password;

  //Si el usuario está autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;

    // Asignar a enlace numero de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }

    // asignar un password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }

    // Asignar el autor
    enlace.autor = req.usuario.id;
  }

  //Almacenar en la BD
  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
  console.log(enlace);
};

// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {

  //console.log(req.params);

  const { url } = req.params;


  // Verificar si existe el enlace
  const enlace  = await Enlaces.findOne({ url });

  if (!enlace) {
    res.status(404).json({ msg: 'Ese enlace no existe' });
    return next();
  }


  //Si el enlace existe
  res.json({archivo: enlace.nombre});

  // Si las descargas son iguales a 1 - Borrar entrada y borras el archivo
  const { descargas } = enlace;
  // Si  las descargas son > a 1 - restar 1
  if (descargas === 1) {
    

    // Eliminar el archivo
    
    // eliminar la entrada de la base de datos
    next(); // para irse al siguiente controlador declarado
  } else {
    enlace.descargas--;
    await enlace.save();
  }


  console.log(enlace)
  
}