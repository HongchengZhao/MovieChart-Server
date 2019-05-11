import { Schema, model } from 'mongoose';

const filmSchema = new Schema({
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

export default model('Film', filmSchema);