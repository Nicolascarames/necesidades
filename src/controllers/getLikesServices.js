const getDB = require('../database/db');

const getLikesServices = async (req, res, next) => {
  let conexion;
  const idservices = req.params.id;
  try {
    conexion = await getDB();

    const [likesServicios] = await conexion.query(
      `SELECT s.idservicios, ls.idlikes, ls.megusta, ls.servicios_id, ls.users_id
      FROM servicios s INNER JOIN likes_servicios ls
      ON s.idservicios = ls.servicios_id
      WHERE s.idservicios = ?`,
      [idservices]
    );

    return res.send({
      status: 'ok',
      data: likesServicios,
    });
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = getLikesServices;
