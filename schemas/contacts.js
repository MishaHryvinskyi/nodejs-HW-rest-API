const Joi = require("joi");

const postSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const putSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
 });

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

 module.exports = {
    postSchema,
    putSchema,
    updateFavoriteSchema,
 }
