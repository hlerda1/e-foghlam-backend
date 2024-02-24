// 1° definir express
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

//2° crear servidor express
const app = express();
//base de datos
dbConnection();

//Directorio publico, use es middleware
app.use(express.static('public'));
//Lectura y parseo body
app.use(express.json());
app.use(cors());

//4° Crear y usar rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/comision', require('./routes/comision'));
app.use('/api/evento', require('./routes/evento'));
app.use('/api/actividad', require('./routes/actividad'));
app.use('/api/materia', require('./routes/materia'));
app.use('/api/curso', require('./routes/curso'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
