const getDb = require('../database/db');
const { generateError } = require('../service/generateError');

const modifyPwd = async (req, res, next) => {
  let conexion;
  try {
    conexion = await getDb();
    const { pwdVieja, pwdNueva } = req.body;
    const { id } = req.isUser;

    const [user] = await conexion.query(
      `
            SELECT id
            FROM users
            WHERE id=? AND pwd=SHA2(?,512)
            `,
      [id, pwdVieja]
    );

    if (user.length === 0) {
      throw generateError('Password actual no correcta', 401);
    }

    await conexion.query(
      `
        UPDATE users
        SET pwd=SHA2(?,512), updated_at=?
        WHERE id=?
        `,
      [pwdNueva, new Date(), id]
    );

    conexion.release();

    res.send({
      status: 'ok',
      message: 'Pwd cambiada correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (conexion) conexion.release();
  }
};

module.exports = modifyPwd;
