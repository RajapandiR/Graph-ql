import { SECRET } from '../config';
import User  from "../models/user";
import jwt from 'jsonwebtoken';

import { AuthenticationError } from 'apollo-server-express';

export const issueToken = async({name, userName, email, id}) => {
	let token = await jwt.sign( {name,userName, email, id} , SECRET , {
		expiresIn: '1d'
	});
	return {
		token
	}
}

export const getAuthUser = async (req, requireAuth = true) => {
  const header = req.headers.authorization;
  console.log(header)
  if (header) {
    // const token = header.replace("Bearer ", "");
    const token = jwt.verify(header, SECRET);
    console.log("token", token)
    let user = await User.findById(token.id);
    console.log("user", user)
    if (!user) {
      throw new AuthenticationError("Invalid user.");
    }
    return user;
  }
  if (requireAuth) {
    throw new AuthenticationError("You must be logged in.");
  }
  return null;
};
