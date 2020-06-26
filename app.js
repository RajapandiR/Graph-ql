import express from 'express';
import mongoose from 'mongoose';
import consola from 'consola';
import cors from 'cors';
import { SECRET } from './config';
import jwt from 'jsonwebtoken';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { ApolloServer } from 'apollo-server-express';
import { DB, IN_PORD, PORT } from './config';

const app = express()
app.use(cors());
app.disable("x-powered-by")
const server = new ApolloServer({
	typeDefs,
	resolvers, 
	playground: IN_PORD
    ? false
    : {
        settings: {
          "request.credentials": "include",
        },
      },
  context: ({ req, res }) => ({ req, res }),
});


const startApp = async () => {
	try {
		
		mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		consola.success({
			message: `Successfully connect with database \n${DB}`,
			badge: true,
		})
		server.applyMiddleware({ app, cors: false });
		app.listen({port: PORT} , () => 
			consola.success({
				message: `Apollo Server start on  \nlocalhost:${PORT}${server.graphqlPath}`,
				badge: true,
			})
		);
	}catch(err){
		consola.error({
			message: err.message,
			badge: true,
		})
	}
}

startApp();