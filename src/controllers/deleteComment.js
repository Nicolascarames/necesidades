const getDb = require('../database/db');
var fs = require('fs');
var path = require('path');

const deleteComment = async (req, res, next) => {
    const {comm_id}= req.body;
    const {id}= req.isUser;
    try {
        conexion = await getDb();
        const [check] = await conexion.query('SELECT users_id FROM comentarios WHERE idcomentarios = ?;', [comm_id]);
        console.log(check,id,comm_id)
        if (check[0].users_id === id) {
            const [files]= await conexion.query(`SELECT fichero_comentario FROM comentarios WHERE idcomentarios = ?`,[comm_id]) 
            if(files[0].fichero_comentario){
                const file = JSON.parse(files[0].fichero_comentario);
                const [del_likes] = await conexion.query(`DELETE FROM likes_comentarios WHERE comentarios_id=? LIMIT 1` ,[comm_id]);
                const [del] = await conexion.query(`DELETE FROM comentarios WHERE idcomentarios=? LIMIT 1` ,[comm_id]);
                 try {
                    fs.unlink(path.join(__dirname + '/../users/'+file.name), function(err) {
                        if (err) {
                          console.log(err) 
                          res.status(200).send({ok:true,message:'file no encontrado'})

                        }else{
                            res.status(200).send({ok:true})
                        }
                      });
                 } catch (error) {
                    console.log(error)
                 } 
            }else{
                const [del_likes] = await conexion.query(`DELETE FROM likes_comentarios WHERE comentarios_id=? LIMIT 1` ,[comm_id]);
                const [del] = await conexion.query(`DELETE FROM comentarios WHERE idcomentarios=? LIMIT 1` ,[comm_id])
                del.affectedRows > 0 ? res.status(200).send({ok:true}): res.status(204).send({ok:false})
            }
            
        } else {
         res.status(204).send({message:'no tienes permisos para eliminar este elemento'})
        }
    } catch (error) {
        console.log(error)
    }
   
};

module.exports = deleteComment;
