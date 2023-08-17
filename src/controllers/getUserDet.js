const getDB = require('../database/db');

const getUserDet = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDB();

    const id = req.params.id;

    const [user] = await conexion.query(
      `SELECT   username,  avatar
    FROM users WHERE id = ?`,
      [id]
    );

    if (user.length) {
      return res.send({
        status: 'ok',
        data: user,
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

module.exports = getUserDet;
