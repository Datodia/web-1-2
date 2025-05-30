
const Joi  = require('joi')

const userSchema = Joi.object({
    fullName: Joi.string().min(6).max(20).required().messages({
        'string.base': 'მხოლოდ სტრინგს ველოდები',
        'string.min': "მინიმუმია 6",
        'string.max': "მაქსიმუმი 6",
        'any.required': "სრული სახელი აუცილებელია"
    }),
    email: Joi.string().email().required(),
    age: Joi.number().min(12).max(80).required().messages({
        'number.base': 'მხოლოდ რიცხვს ველოდები',
        'number.min': 'minimum',
        'number.max': 'maxisum',
        'any.required': "აუცილებელია ასაკის გადმოცემა"
    }),
    password: Joi.string().regex(new RegExp('^[A-Za-z0-9]+$')).required(),
    isSmoker: Joi.boolean().optional().default(false)
})

module.exports = userSchema
