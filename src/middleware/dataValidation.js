const Joi = require('joi');

const dataValidation = (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      nombre: Joi.string().max(45).required(),
      username: Joi.string().max(45).required(),
      biografia: Joi.string().max(1000),
      avatar: Joi.string().max(45),
      email: Joi.string().email().max(45).required(),
      token: Joi.string().max(50),
      pwd: Joi.string().min(4).max(45).required(),
    });

    const validation = schema.validate(req.body);
    console.log(validation);
    if (validation.error) {
      res.status(403).send({ message: validation.error });
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({ message: error });
  }
};

module.exports = dataValidation;
