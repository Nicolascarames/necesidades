const getDB = require('../database/db');

const srcData = async (req, res, next) => {
  let conexion;
  const { text } = req.body;
  try {
    conexion = await getDB();
    const [service] = await conexion.query(
      `
        SELECT users_id,titulo,idservicios,hashtag1,hashtag2,hashtag3,hashtag4,hashtag5 
        FROM servicios 
        WHERE titulo LIKE '%${text}%' 
        or hashtag1 LIKE '%${text}%'
        or hashtag2 LIKE '%${text}%'
        or hashtag3 LIKE '%${text}%'
        or hashtag4 LIKE '%${text}%'
        or hashtag5 LIKE '%${text}%';
         `,
      [text]
    );
    console.log(service);
    res.send(service);
  } catch (error) {
    console.log(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = srcData;
