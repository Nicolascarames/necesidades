const getDb = require('../database/db');
const { generateError } = require('../service/generateError');
var fs = require('fs');
var path = require('path');
const modifyUser = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.isUser);
  let conexion;

  try {
    conexion = await getDb();
    const { nombre, username, biografia } = req.body;
    const { id } = req.isUser;
    let file;
    if(req.file){
      const fileName = req.file.filename;
      const fileType = req.file.mimetype;
      file = JSON.stringify({name:fileName,type:fileType})
      const [oldavatar]= await conexion.query(
        `SELECT avatar FROM users WHERE id= ? `,[id]
        
      );
     
        const oldfile = JSON.parse(oldavatar[0].avatar);
        if(oldfile.name !== 'default_avatar.png'){
           fs.unlink(path.join(__dirname + '/../users/' + oldfile.name), function(err) {
          if (err) {
            console.log(err) 
          }});
        }
       
        
      await conexion.query(
      `
        UPDATE users
        SET nombre=?, username=?, biografia=?, avatar=?, updated_at=?
        WHERE id=?
        `,
      [nombre, username, biografia, file, new Date(), id]
    );
   
  
    }else{
      await conexion.query(
        `
          UPDATE users
          SET nombre=?, username=?, biografia=?,  updated_at=?
          WHERE id=?
          `,
        [nombre, username, biografia,  new Date(), id]
      );
    }
    
    

    const [user] = await conexion.query(
      `
            SELECT id, nombre, username, email, active, role
            FROM users
            WHERE id=?
            `,
      [id]
    );

    const usuario = {
      id: user[0].id,
      nombre: user[0].nombre,
      username: user[0].username,
      email: user[0].email,
      active: user[0].active,
      role: user[0].role,
    };


    res.send({
      status: 'ok',
      message: 'Usuario modificado correctamente',
      usuario: usuario,
    });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = modifyUser;
