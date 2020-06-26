import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		profile: User
		users: [User!]!
		user(id: ID): User
		login(userName: String!, password: String!): Auth!
	}
	extend type Mutation {
		register(
			name: String!
			email: String!
			userName: String!
			password: String!
		): Auth!
	}
	type User {
		id: ID!
		name: String!
		email: String!
		userName: String!
		createAt: String!
		updateAt: String!
	}
	type Auth {
		user: User
		token: String!
	}

`;



