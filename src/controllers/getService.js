const getDB = require('../database/db');

const getService = async (req, res, next) => {
  let conexion;
  const idService = req.params.id;
  try {
    conexion = await getDB();

    const [service] = await conexion.query(
      `SELECT * FROM servicios WHERE idservicios = ? `,
      [idService]
    );
    const [owner] = await conexion.query(
      `SELECT username,avatar FROM users  WHERE id=?;`,
      [service[0].users_id]
    );
    

    const [coments] = await conexion.query(
      `SELECT * ,
      (SELECT avatar FROM users WHERE id = users_id) AS avatar,
      (SELECT username FROM users WHERE id = users_id) AS owner FROM comentarios WHERE servicios_id=?;
      `,
      [idService]
    );


    if (service.length) {
      return res.send({
        status: 'ok',
        dataService: service,
        dataComents: coments,
        owner:owner
      });
    } else {
      res.status(400).send('servicio no encontrado');
    }
  } catch (error) {
    // console.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = getService;
