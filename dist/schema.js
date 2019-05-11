"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = apollo_server_express_1.gql `
    scalar Date

    type Query {
        film(id: ID): Film,
        films(pageIndex: Int, pageSize: Int): FilmsSlice
        search(keyword: String, pageIndex: Int, pageSize: Int): FilmsSlice
    }

    type Film {
        _id: ID!
        title: String!
        poster: String!
        summary: String!
        year: String
        duration: String
        directors: [Director]
        casts: [Actor]
        writers: [Writer]
        pubdate: [String]
        countries: [String]
        rating: Rating
        languages: [Language]
        genres: [Genre]
        aka: [String]
        imdb: String
    }

    type Director {
        _id: ID!
        name: String
    }

    type Actor {
        _id: ID!
        name: String
    }

    type Writer {
        _id: ID!
        name: String
    }

    type Pubinfo {
        country: String
        pubdate: Date
    }

    type Rating {
        average: String
        rating_people: String
        stars: [String]
    }

    type Genre {
        _id: ID!
        name: String
    }

    type Language {
        _id: ID!
        name: String
    }

    type FilmsSlice {
        films: [Film],
        totalCount: Int
    }
`;
exports.default = typeDefs;
