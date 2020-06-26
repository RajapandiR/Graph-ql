import Joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import User from '../../models/user';
import { issueToken, getAuthUser } from '../../jwt/auth';
import { registerValidate , loginValidate } from "../validators";

export default {
	Query: {
		profile: async (root, args, { req }, info) => {
	     	 const authUser = await getAuthUser(req);
	      	return authUser;
    	},
		users: async (root, args,{ req }, info ) => {
			let user = await User.find()
			return user;
		},
		login: async (root, args,{ req }, info ) => {
			
			await loginValidate.validate(args, { abortEarly: true } )
			let user = await User.findOne({userName: args.userName})
			if(!user){
				throw new Error("Username Not found")
			}
			let getPass = await bcrypt.compare(args.password, user.password)
			if(!getPass) {
				throw new Error("Login invalid")
			}
			let token = await issueToken(user)
			return {
				user: user,
				...token,
			} 
		},
	},
	Mutation: {
		register: async (root, args,{ req }, info ) => {
			await registerValidate.validate(args, { abortEarly: true } )
			let user = await User.findOne({userName: args.userName})
			if(user){
				throw new Error("username already taken")
			}
			user = await User.findOne({email: args.email})
			if(user){
				throw new Error("email already taken")
			}
			args.password = await bcrypt.hash(args.password, 10);
			let newUser = await User.create(args)
			let token = await issueToken(newUser)
			return {
				user: newUser,
				...token,
			}
		},
	},
}