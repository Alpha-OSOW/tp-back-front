const Joi = require("joi")

const schemaJoiUser = Joi.object({
    email : Joi.string().max(255).email({ tlds: { allow: false } }).required(),
    password : Joi.string().max(255).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
    role : Joi.string().valid("redacteur","admin").required()
});

const schemaLogin = Joi.object({
    email : Joi.string().email({ tlds: { allow: false } }).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required()
});

const schemaOeuvreJoi = Joi.object({ // 19 vérifications 
    nom : Joi.string().max(255).required(),
    desciption : Joi.string().max(10000).required(),
    auteur : Joi.number().max(255).required(),
    // auteur : Joi.string().min(5).max(255).required(),
})

module.exports.schemaJoiUser = schemaJoiUser;
module.exports.schemaOeuvreJoi = schemaOeuvreJoi;
module.exports.schemaLogin = schemaLogin;