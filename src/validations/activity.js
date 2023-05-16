const Joi = require('joi');

const createValidation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    description: Joi.string().min(40).max(250).required(),
    isActive: Joi.boolean().default(false),
  });

  const validation = activityValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const updateValidation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(3).max(15),
    description: Joi.string().min(40).max(250),
    isActive: Joi.boolean(),
  });

  const validation = activityValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  createValidation,
  updateValidation,
};
