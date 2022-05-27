import Joi from "joi";

/* Create your schemas here.
Using Joi for validation.
 */

export const modeSchema = Joi.object({
    pid: Joi.string()
        .required(),
    title: Joi.string()
        .required(),
    genre: Joi.string()
        .min(2)
        .max(30)
        .required(),
    image: Joi.string()
        .max(2000)
        .required(),
    difficulty: Joi.number()
        .integer()
        .min(1)
        .max(3)
});