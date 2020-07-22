import * as Joi from '@hapi/joi';

export const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  ),
  repeatPassword: Joi.ref('password'),
});
