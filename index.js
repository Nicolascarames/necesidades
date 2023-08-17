const env = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const path = require('path');
const router = require('./src/routes/index');

app.use(morgan('dev'));
app.use(cors());
app.use('/files', express.static('./src/users'));
app.use(express.json());
app.use(router);

//middleware si no entra en ninguna ruta definida
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'not found middle sino entra a nada',
  });
});

//middleware de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: error.httpStatus,
    message: error.message,
  });
});

app.listen(3001, () => console.log('Servidor escuchando en puerto 3001'));
