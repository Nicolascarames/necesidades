const getDb = require('../database/db');
const { generateError } = require('../service/generateError');

const privadosGet = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDb();
    const toUser = req.params.id;
    const { id } = req.isUser;

    const [privados] = await conexion.query(
      `
            SELECT *
            FROM mensajes_privados
            WHERE users_id=? AND to_user=?
            `,
      [id, toUser]
    );

    res.send({
      status: 'ok',
      data: privados,
    });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = privadosGet;
