const getDB = require('../database/db');

const getServices = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDB();
    const order = req.params.order;
    let orderquery;
    if(order === 'newest'){
      orderquery = 'create_at'
    }else if(order === 'likes'){
      orderquery = 'likes'
    }
    else if(order === 'comments'){
      orderquery = 'comentarios'
    }
    else if(order === 'done'){
      orderquery = 'finalizado'
    }
    const [user] = await conexion.query(
      `SELECT * ,
      (SELECT avatar FROM users WHERE id = users_id) AS avatar,
      (SELECT username FROM users WHERE id = users_id) AS owner,
      (SELECT COUNT(*) FROM comentarios WHERE idservicios = servicios_id ) AS comentarios,
      (SELECT COUNT(*) FROM likes_servicios WHERE idservicios = servicios_id ) AS likes FROM servicios ORDER BY ${orderquery} DESC;`);

    if (user.length) {
      return res.send({
        status: 'ok',
        data: user,
      });
    } else {
      res.status(400).send('servicios no encontrado');
    }
  } catch (error) {
    // console.error(error);
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = getServices;
