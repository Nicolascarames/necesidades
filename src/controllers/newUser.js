const getDb = require('../database/db');
const { generateError } = require('../service/generateError');
const sendMail = require('../controllers/sendMail');
const { v4: uuidv4 } = require('uuid');

const newUser = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDb();
    const { nombre, username, biografia, email, pwd } = req.body;
    const avatar = JSON.stringify({name:'default_avatar.png',type:'image/png'})

    const [mailExist] = await conexion.query(
      `SELECT * FROM users WHERE email=?`,
      [email]
    );
    const [usernameExists] = await conexion.query(
      `SELECT * FROM users WHERE username=?`,
      [username]
    );
    if (mailExist.length > 0) {
      throw generateError('Mail en uso', 500);
    }
    if (usernameExists.length > 0) {
      throw generateError('Nombre de usuario en uso', 500);
    }

    const [user] = await conexion.query(
      `
    INSERT INTO users (
      nombre, username, biografia, avatar,email, pwd,act_code
    ) VALUES (?,?,?,?,?,SHA2(?,512),?)
    `,
      [nombre, username, biografia,avatar, email, pwd, uuidv4()]
    );

    const [getCodeUser] = await conexion.query(
      `SELECT act_code FROM users WHERE email='${email}'`
    );

    // console.log(getIdUser);

    res.send({
      status: 'ok',
      message:
        'Usuario creado correctamente, revisa tu email para la confirmacion',
    });

    sendMail(getCodeUser[0].act_code, email);
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = newUser;
