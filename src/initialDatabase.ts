import fs from 'fs';
import { Actor, Director, Film, Genre, Writer, Language } from './models';

async function getIDs(model: any, arr: any[]) {
    let ids: any[] = [];
    for (let a of arr) {
        let c = await model.findOne({ id: a.id });
        if (c === null) {
            c = await model.create(a);
        }
        ids.push(c._id);
    }
    return ids;
}

async function getIds(model: any, arr: any[]) {
    const ids = [];
    for (let g of arr) {
        if (g === '') continue;
        
        let genre = await model.findOne({ name: g });
        if (genre === null) {
            genre = await model.create({ name: g });
        }
        ids.push(genre._id);
    }

    return ids;
}

export default function initialDatabase() {
    fs.readFile('static/films_all.json', 'utf8', async function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        const films = JSON.parse(data);
        let length = films.length;
 
        for (let i = 4547; i < length; ++i) {
            const film = films[i];
            const casts = await getIDs(Actor, film.casts);
            const directors = await getIDs(Director, film.directors);
            const writers = await getIDs(Writer, film.writers);
            const genres = await getIds(Genre, film.genres);
            const languages = await getIds(Language, film.languages);

            /*
            let f = await Film.findOne({ id: film._id });
            if (f === null) {
                
            }
            */
            Film.create({
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