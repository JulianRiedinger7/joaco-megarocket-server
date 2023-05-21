const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.string().min(6).max(9).required()
      .messages({
        'string.pattern.base': 'Day can only be Monday/Tuesday/Wednesday/Thursday/Friday/Saturday',
      }),
    hour: Joi.string().min(5).max(5).regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .required()
      .messages({
        'string.pattern.base': 'Hour must be of format hh:mm',
      }),
    trainer: Joi.required(),
    activity: Joi.required(),
    slots: Joi.number().positive().min(2).max(15)
      .optional(),
  });

  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();

  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const classValidation = Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday').optional().messages({
      'string.pattern.base': 'Day can only be Monday/Tuesday/Wednesday/Thursday/Friday/Saturday',
    }),
    hour: Joi.string().min(5).max(5).regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .optional()
      .messages({
        'string.pattern.base': 'Hour must be of format hh:mm',
      }),
    trainer: Joi.optional(),
    activity: Joi.optional(),
    slots: Joi.number().positive().min(2).max(15)
      .optional(),
  }).min(1);

  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();

  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
};
