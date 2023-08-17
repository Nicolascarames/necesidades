const getDB = require('../database/db');

const addLike = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDB();

    const { id } = req.isUser;
    const { servicios_id, comentarios_id, idLikes } = req.body;

    if (servicios_id && !comentarios_id) {
      if (idLikes) {
        const [likesServicios] = await conexion.query(
          `DELETE FROM likes_servicios WHERE idlikes=?`,
          [idLikes]
        );
        return res.send({
          status: 'ok',
          data: likesServicios,
          action: 'borrado',
        });
      }
      if (!idLikes) {
        const [likesServicios] = await conexion.query(
          `INSERT INTO likes_servicios (megusta,servicios_id, users_id) 
                VALUES(?,?,?)`,
          [1, servicios_id, id]
        );
        return res.send({
          status: 'ok',
          data: likesServicios,
        });
      }
    }

    if (comentarios_id) {
      if (idLikes) {
        const [likesComentarios] = await conexion.query(
          `DELETE FROM likes_comentarios WHERE idlikes=?`,
          [idLikes]
        );
        return res.send({
          status: 'ok',
          data: likesComentarios,
          action: 'borrado',
        });
      }
      if (!idLikes) {
        const [likesComentarios] = await conexion.query(
          `INSERT INTO likes_comentarios (megusta,comentarios_id, users_id, servicios_id) 
                  VALUES(?,?,?,?)`,
          [1, comentarios_id, id, servicios_id]
        );
        console.log(1, comentarios_id, id, servicios_id);
        return res.send({
          status: 'ok',
          data: likesComentarios,
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = addLike;
