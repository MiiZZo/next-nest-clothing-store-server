import * as Joi from '@hapi/joi';

export const changeRoleValidationSchema = Joi.object({
  userId: Joi.string(),
  roleId: Joi.string(),
});
