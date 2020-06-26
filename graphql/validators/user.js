import Joi from "@hapi/joi";

const name = Joi.string().max(256).required().label("Name")
const email = Joi.string().email().required().label("Email")
const userName = Joi.string().max(256).required().label("User Name")
const password = Joi.string().max(256).min(8).required().label("Password")


export const loginValidate = Joi.object().keys({
	userName,
	password
})

export const registerValidate = Joi.object().keys({
	name,
	email,
	userName,
	password
})