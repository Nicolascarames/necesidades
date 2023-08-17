const getDB = require('../database/db');

const getUserById = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDB();

    const { id } = req.params;

    const [user] = await conexion.query(
      `SELECT id, nombre, username, email,biografia, avatar, role 
    FROM users WHERE id = ?`,
      [id]
    );

    const [colaboraciones1] = await conexion.query(
      `SELECT *,
        (SELECT avatar FROM users WHERE id = users_id) AS avatar FROM servicios WHERE users_id=?;`,
      [id, id]
    );

    const [colaboraciones2] = await conexion.query(
      `SELECT *,
         (SELECT avatar FROM users WHERE id = users_id) AS avatar,
         (SELECT username FROM users WHERE id = users_id) AS owner FROM comentarios WHERE users_id=?`,
      [id]
    );

    if (user.length) {
      return res.send({
        status: 'ok',
        data: user,
        servicios: colaboraciones1,
        comentarios: colaboraciones2,
      });
    } else {
      res.status(404).send('usuario no encontrado');
    }
  } catch (error) {
    // console.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = getUserById;
