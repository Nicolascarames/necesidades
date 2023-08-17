const getDb = require('../database/db');
const { generateError } = require('../service/generateError');
var fs = require('fs');
var path = require('path');

const markDone = async (req, res, next) => {
    let conexion;
    try {
        const { id } = req.isUser;
        conexion = await getDb();
        if (req.body.done) {
            const [check] = await conexion.query('SELECT users_id FROM servicios WHERE idservicios = ?;', [req.body.done]);
            if (check[0].users_id === id) {
                const [done] = await conexion.query('UPDATE servicios SET finalizado=1 WHERE idservicios =? ;', [req.body.done]);
                done.affectedRows > 0 ? res.status(200).send('ok') : res.status(204).send('not ok')
            } else {
                res.status(204).send('no hay permisos')
            }
        }
        if (req.body.delete) {
          
            let files = [];
            const [files_comm] = await conexion.query(`SELECT fichero_comentario from comentarios where servicios_id= ? ;`, [req.body.delete]);
           
           
            if(files_comm.length){
                console.log(JSON.parse(files_comm[0].fichero_comentario));
                for (let index = 0; index < files_comm.length; index++) {
                const file = JSON.parse(files_comm[index].fichero_comentario);
                if(file){files.push(file.name)}
                 
            };}
           

            const [file_service] = await conexion.query(`SELECT fichero FROM servicios WHERE idservicios=?;`, [req.body.delete]);
            const file = JSON.parse(file_service[0].fichero);
            if(file){files.push(file.name)}
            
            console.log('files', files)
            const [check] = await conexion.query('SELECT users_id FROM servicios WHERE idservicios = ?;', [req.body.delete]);
            if (check[0].users_id === id) {
                   const [comm_done_likes] = await conexion.query(`DELETE FROM likes_comentarios WHERE servicios_id = ?;`,[req.body.delete] );
                   const [service_done_likes] = await conexion.query(`DELETE FROM likes_servicios WHERE servicios_id = ?;`,[req.body.delete] );
                   const [done_comm] = await conexion.query(`DELETE FROM comentarios WHERE servicios_id = ?;`,[req.body.delete] );
                   const [done_service] = await conexion.query(`DELETE from  servicios  WHERE idservicios = ? LIMIT 1;`,[req.body.delete] );
                   
                  if(done_service.affectedRows > 0){
                    function deleteFiles(files, callback){
                        var i = files.length;
                       
                        files.forEach(function(filepath){
                          fs.unlink(path.join(__dirname + '/../users/'+files[i-1]), function(err) {
                            i--;
                            if (err) {
                              callback(err);
                              return;
                            } else if (i <= 0) {
                              callback(null);
                            }
                          });
                        });
                      }
                      
                      deleteFiles(files, function(err) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('all files removed');
                        }
                      });
                    res.status(200).send({ok:true})
                  }else{res.status(204).send({ok:false})}  
            } else {
                res.status(204).send('no hay permisos')
            }
        }

    } catch (error) {
        next(error);
    } finally {
        if (conexion) conexion.release();
    }
};

module.exports = markDone;
