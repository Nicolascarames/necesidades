require('dotenv').config();
const getDB = require('../database/db');
const tokenJson = require('jsonwebtoken');
const { generateError } = require('../service/generateError');

const loginUser = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDB();

    const { email, pwd } = req.body;
    // console.log(email, pwd);
    if (!email || !pwd) {
      throw generateError('faltan email o pwd', 400);
    }

    const [user] = await conexion.query(
      `
            SELECT id, nombre, username, email, active, role,avatar
            FROM users
            WHERE email = ? AND pwd = SHA2(?,512)
            `,
      [email, pwd]
    );

    // console.log(user);
    if (user.length === 0) {
      throw generateError('Email o pwd incorrentos', 401);
    }

    // token

    const info = {
      id: user[0].id,
      fecha: new Date(),
    };

    const usuario = {
      id: user[0].id,
      nombre: user[0].nombre,
      username: user[0].username,
      email: user[0].email,
      active: user[0].active,
      role: user[0].role,
      avatar:user[0].avatar
    };

    if (usuario.active === 0) {
      throw generateError('usuario no activado', 409);
    }

    const token = tokenJson.sign(info, process.env.secret_token, {
      expiresIn: '1d',
    });

    res.status(200).send({
      status: 'ok',
      message: 'login',
      token:token,
      username: usuario.username,
      avatar:usuario.avatar,
      id:usuario.id
    });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = loginUser;
