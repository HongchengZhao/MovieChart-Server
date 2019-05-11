"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const filmSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    duration: {
        type: String,
        default: ''
    },
    directors: {
        type: [String]
    },
    casts: {
        type: [String]
    },
    writers: {
        type: [String]
    },
    countries: [String],
    pubdate: [String],
    rating: {
        type: {
            average: Number,
            rating_people: Number,
            stars: [Number]
        }
    },
    languages: {
        type: [String]
    },
    genres: {
        type: [String]
    },
    aka: {
        type: [String]
    },
    imdb: String
});
exports.default = mongoose_1.model('Film', filmSchema);
