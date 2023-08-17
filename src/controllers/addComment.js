const getDB = require('../database/db');
const fs = require('fs');
const path = require('path');
const { generateError } = require('../service/generateError');

const addComment = async (req, res, next) => {
  let connection;
  try {
    const { service_id, comment } = req.body;
    const userId = req.isUser.id;
    console.log(req.file)
    if (!service_id || !comment || !userId) {
      if (req.file) {
        fs.unlinkSync(
          path.join(__dirname + '/../users/' + req.file.filename)
        ),
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
          };
        throw generateError('Falta titulo o descripcion', 500);
      }
    } else {
      if (req.file) {
        //si hay un titulo , descripcion ,file guardo el todo en la tabla servicios
        const fileName = req.file.filename;
        const userId = req.isUser.id;
        const fileType = req.file.mimetype;
        const file = JSON.stringify({name:fileName,type:fileType})
        console.log(req.file);

        connection = await getDB();

        const [response] = await connection.query(
          `INSERT INTO comentarios(users_id,comentario,fichero_comentario,servicios_id) 
        VALUES(?,?,?,? )`,
          [userId, comment,file, service_id]
        );

        //conpruebo que la query se hizo correctamente

        response.affectedRows > 0
          ? res.send({ message: `comentario añadido correctamente` })
          : res.send({
              message:
                'Problema con la conexión con la base de datos :( porfavor,vuelve a intentarlo',
            });
      } else {
        //si solo  hay un titulo y una descripcion guardo las dos  en la tabla servicios sin la imagen

        const userId = req.isUser.id;

        const connection = await getDB();
        const [response] = await connection.query(
          `INSERT INTO comentarios(users_id,comentario,servicios_id) 
        VALUES(?,?,?)`,
          [userId, comment, service_id]
        );

        //conpruebo que la query se hizo correctamente
        response.affectedRows > 0
          ? res.send({ message: `comentario añadido correctamente` })
          : res.send({
              message:
                'Problema con la conexión con la base de datos :( porfavor,vuelve a intentarlo',
            });
      }
    }
  } catch (error) {
    // console.log(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addComment;
