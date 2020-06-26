import mongoose from 'mongoose';

const UserSchema =  mongoose.Schema({

	name: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
}, {timestamps: true})

const User = mongoose.model('users', UserSchema);

export default User;