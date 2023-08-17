const getDb = require('../database/db');
const { generateError } = require('../service/generateError');

const bestComent = async (req, res, next) => {
  let conexion;
  try {
    const { id } = req.params;
    // console.log(req.params);
    conexion = await getDb();

    const [resp] = await conexion.query(
      `SELECT mejor_comentario FROM comentarios WHERE idcomentarios=?`,
      [id]
    );

    console.log(resp);
    let correcto = resp[0].mejor_comentario;
    console.log(correcto);

    if (correcto === 1) {
      correcto = 0;
    } else {
      correcto = 1;
    }

    // console.log(correcto);

    const respuesta = await conexion.query(
      `UPDATE comentarios SET mejor_comentario =? WHERE idcomentarios=?`,
      [correcto, id]
    );

    // console.log(respuesta);

    res.send({
      status: 'ok',
      message: 'Seleccionado como mejor comentario',
      respuesta,
      correctosiono: correcto,
    });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = bestComent;
