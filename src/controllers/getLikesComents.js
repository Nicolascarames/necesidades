const getDB = require('../database/db');

const getLikesComents = async (req, res, next) => {
  let conexion;
  const idComents = req.params.id;

  try {
    conexion = await getDB();

    const [likesComents] = await conexion.query(
      `SELECT c.idcomentarios, c.users_id, l.idlikes, l.megusta, l.users_id, comentarios_id
      FROM comentarios c INNER JOIN likes_comentarios l
      ON c.idcomentarios = l.comentarios_id
      WHERE c.idcomentarios = ?`,
      [idComents]
    );

    return res.send({
      status: 'ok',
      data: likesComents,
    });
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = getLikesComents;
