const express = require('express');
const { ApolloServer , gql} = require ('apollo-server-express');
const app = express()
const port = 3000;
const typeDefs = gql`
	type Query {
		hello: String!
	}
` 
const resolvers = {
	 Query: {
		hello: () => "hello"
	}
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
server.applyMiddleware({ app, path: '/graphql' });
app.listen(port , () => console.log(`Apollo Server start on  \n${port}${server.graphqlpath}`)) 