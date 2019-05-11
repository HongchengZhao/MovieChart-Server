import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';

mongoose.connect(process.env.DB_HOST as string, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("connected!");

    const app = express();
    app.use(cors());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        introspection: true
    });

    server.applyMiddleware({ app }); // app is from an existing express app

    app.listen({ port: 1000 }, () => {
        console.log('I am listening!');
    });
}).catch((err: any) => console.error(err));

