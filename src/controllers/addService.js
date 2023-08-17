const getDB = require('../database/db');
const fs = require('fs');
const path = require('path');
const { generateError } = require('../service/generateError');

const AddService = async (req, res, next) => {
  let connection;

  try {
    const {
      title,
      description,
      hashtag1,
      hashtag2,
      hashtag3,
      hashtag4,
      hashtag5,
    } = req.body;

    console.log(hashtag3);

    if (!title || !description) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname + '/../users/' + req.file.filename)),
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
        const file = JSON.stringify({ name: fileName, type: fileType });
        connection = await getDB();

        const [response] = await connection.query(
          `INSERT INTO servicios(titulo, descripcion, fichero, users_id, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5) VALUES(?,?,?,?,?,?,?,?,?)`,
          [
            title,
            description,
            file,
            userId,
            hashtag1,
            hashtag2,
            hashtag3,
            hashtag4,
            hashtag5,
          ]
        );

        //conpruebo que la query se hizo correctamente

        if (response.affectedRows > 0) {
          res.send({
            message: `servicio creado corectamente!`,
            id_servicio: response.insertId,
          });
        } else {
          res.send({
            message:
              'Problema con la conexión con la base de datos :( porfavor,vuelve a intentarlo',
          });
        }
      } else {
        //si solo  hay un titulo y una descripcion guardo las dos  en la tabla servicios sin la imagen

        const userId = req.isUser.id;
        const connection = await getDB();
        const [response] = await connection.query(
          `INSERT INTO servicios(titulo,descripcion,users_id, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5) VALUES(?,?,?,?,?,?,?,?)`,
          [
            title,
            description,
            userId,
            hashtag1,
            hashtag2,
            hashtag3,
            hashtag4,
            hashtag5,
          ]
        );
        //conpruebo que la query se hizo correctamente
        response.affectedRows > 0
          ? res.send({
              msg: 'servicio creado correctamente',
              id_servicio: response.insertId,
            })
          : res.send(
              'Problema con la conexión con la base de datos :( porfavor,vuelve a intentarlo'
            );
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = AddService;
