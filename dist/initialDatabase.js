"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const models_1 = require("./models");
async function getIDs(model, arr) {
    let ids = [];
    for (let a of arr) {
        let c = await model.findOne({ id: a.id });
        if (c === null) {
            c = await model.create(a);
        }
        ids.push(c._id);
    }
    return ids;
}
async function getIds(model, arr) {
    const ids = [];
    for (let g of arr) {
        if (g === '')
            continue;
        let genre = await model.findOne({ name: g });
        if (genre === null) {
            genre = await model.create({ name: g });
        }
        ids.push(genre._id);
    }
    return ids;
}
function initialDatabase() {
    fs_1.default.readFile('static/films_all.json', 'utf8', async function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        const films = JSON.parse(data);
        let length = films.length;
        for (let i = 4547; i < length; ++i) {
            const film = films[i];
            const casts = await getIDs(models_1.Actor, film.casts);
            const directors = await getIDs(models_1.Director, film.directors);
            const writers = await getIDs(models_1.Writer, film.writers);
            const genres = await getIds(models_1.Genre, film.genres);
            const languages = await getIds(models_1.Language, film.languages);
            /*
            let f = await Film.findOne({ id: film._id });
            if (f === null) {
                
            }
            */
            models_1.Film.create({
                id: film._id,
                title: film.title,
                poster: film.poster,
                summary: film.summary,
                year: film.year,
                duration: film.duration,
                aka: film.aka,
                imdb: film.imdb,
                rating: film.rating,
                countries: film.countries,
                pubdate: film.pubdate,
                casts,
                directors,
                writers,
                genres,
                languages
            }).catch(err => {
                console.error(err);
            });
            console.log(`${i} / ${length}`);
        }
        console.log('finished!');
    });
}
exports.default = initialDatabase;
