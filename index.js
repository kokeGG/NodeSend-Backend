const express = require('express');
const conectarDB = require('./config/db');

// crear el servidor
const app = express();


// conectar a laa base de datos
conectarDB();

console.log('Comenzando Node Send')

// Puerto de la app
const port = process.env.PORT || 4000;

// Habilitar leer los valores de un body
app.use( express.json() );

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/enlaces', require('./routes/enlaces'))
app.use('/api/archivos', require('./routes/archivos'))



// Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor estaa funcionando en el puerto ${port}`)
});