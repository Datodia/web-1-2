
const Joi  = require('joi')

const userSchema = Joi.object({
    password: Joi.string().regex(new RegExp('^[A-Za-z0-9]+$')).required(),
    isSmoker: Joi.boolean().optional().default(false)
})

module.exports = userSchema
