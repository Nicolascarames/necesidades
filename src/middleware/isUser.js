require('dotenv').config();
const getDB = require('../database/db');
const jwt = require('jsonwebtoken');
const { generateError } = require('../service/generateError');

const isUser = async (req, res, next) => {
  let conexion;

  try {
    const { authorization } = req.headers;
    // console.log(req.headers);
    // console.log(authorization);

    if (!authorization) {
      throw generateError('Falta cabezera de autorizacion', 401);
    }

    let token;
    try {
      token = jwt.verify(authorization, process.env.secret_token);
    } catch {
      throw generateError('token incorrecto', 401);
    }

    // console.log(token);
    conexion = await getDB();

    const [user] = await conexion.query(
      `SELECT id, nombre, username, email, active, role, updated_at, deleted
    FROM users WHERE id = ?`,
      [token.id]
    );

    const ultimafecha = user[0].updated_at;
    const fechatoken = token.fecha;
    const tokenfecha = new Date(fechatoken);
    // console.log(ultimafecha.getTime());
    // console.log(tokenfecha.getTime());
    if (ultimafecha.getTime() > tokenfecha.getTime()) {
      throw generateError('usuario modificado despues de generar token', 401);
    }

    if (user[0].active === 0) {
      throw generateError(
        'usuario no activado, porfavor revisa el correo de confirmacion',
        401
      );
    }
    console.log(user[0].active);

    //meto info del token en req para usarla en controllers
    req.isUser = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isUser;
