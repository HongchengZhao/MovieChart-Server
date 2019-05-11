"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const resolvers = {
    Query: {
        film: async (_, args) => {
            try {
                return await models_1.Film.findById(args.id);
            }
            catch (e) {
                console.error(e.message);
                return null;
            }
        },
        films: async (_, args) => {
            try {
                const films = await models_1.Film.find().skip((args.pageIndex - 1) * args.pageSize).limit(args.pageSize);
                const totalCount = await models_1.Film.estimatedDocumentCount();
                return {
                    films,
                    totalCount
                };
            }
            catch (e) {
                console.error(e.message);
                return null;
            }
        },
        search: async (_, args) => {
            try {
                if (args.keyword.length === 0) {
                    return [];
                }
                const reg = new RegExp(args.keyword, 'i');
                const totalCount = await models_1.Film.countDocuments({ title: { $regex: reg } });
                const films = await models_1.Film.find({ title: { $regex: reg } }).skip((args.pageIndex - 1) * args.pageSize).limit(args.pageSize);
                return {
                    films,
                    totalCount
                };
            }
            catch (e) {
                console.error(e.message);
                return [];
            }
        }
    },
    Film: {
        directors: async (blog) => {
            try {
                return Array.from(blog.directors).map(async (id) => await models_1.Director.findById(id));
            }
            catch (e) {
                console.error(e.message);
                return [];
            }
        },
        writers: async (blog) => {
            try {
                return Array.from(blog.writers).map(async (id) => await models_1.Writer.findById(id));
            }
            catch (e) {
                console.error(e.message);
                return [];
            }
        },
        casts: async (blog) => {
            try {
                return Array.from(blog.casts).map(async (id) => await models_1.Actor.findById(id));
            }
            catch (e) {
                console.error(e.message);
                return [];
            }
        },
        genres: async (blog) => {
            try {
                return Array.from(blog.genres).map(async (id) => await models_1.Genre.findById(id));
            }
            catch (e) {
                console.error(e.message);
                return [];
            }
        },
        languages: async (blog) => {
            try {
                return Array.from(blog.languages).map(async (id) => await models_1.Language.findById(id));
            }
            catch (e) {
                console.error(e.message);
                return [];
            }
        },
    }
};
exports.default = resolvers;
/*
query {
  films(pageIndex: 5, pageSize: 5){
    films {
        _id,
        title,
        rating{
        average,
        rating_people,
        stars
        },
        pubinfo{
        pubdate,
        country
        },
        poster
        summary,
        writers{
        _id,
        name
        },
        directors{
        _id,
        name
        }
        casts{
        _id,
        name
        },
        languages{
        _id,
        name
        },
      genres{
        _id,
        name
      }
        imdb,
        aka,
        duration,
        year
    }
  }
}
*/ 
