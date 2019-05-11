"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
mongoose_1.default.connect(process.env.DB_HOST, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("connected!");
    const app = express_1.default();
    app.use(cors_1.default());
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1.default,
        resolvers: resolvers_1.default,
        playground: true,
        introspection: true
    });
    server.applyMiddleware({ app }); // app is from an existing express app
    app.listen({ port: 1000 }, () => {
        console.log('I am listening!');
    });
}).catch((err) => console.error(err));
