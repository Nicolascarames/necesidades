const getDB = require('../database/db');

const confirmMail = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const [response] = await connection.query(
      `UPDATE  users SET active ='1',updated_at = NOW() WHERE act_code = '${req.params.code}'`
    );
    // console.log(response);
    if (response.affectedRows > 0) {
      res.send('Usuario activado con exíto');
    } else {
      res.send('Algo ha ido mal :( ');
    }
  } catch (error) {
   console.log(error)
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = confirmMail;
