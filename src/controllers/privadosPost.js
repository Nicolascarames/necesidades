const getDb = require('../database/db');
const { generateError } = require('../service/generateError');

const privadosPost = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDb();
    const { mensaje, toUser, ownerid } = req.body;
    const { id } = req.isUser;

    const [privados] = await conexion.query(
      `INSERT INTO mensajes_privados (mensaje, users_id, to_user, owner_id) 
              VALUES(?,?,?,?)`,
      [mensaje, id, toUser, ownerid]
    );

    res.send({
      status: 'ok',
      message: 'mensaje privado subido con exito',
    });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = privadosPost;
