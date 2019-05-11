import { Actor, Director, Film, Genre, Writer, Language } from './models';

const resolvers = {
    Query: {
        film: async (_: any, args: any) => {
            try {
                return await Film.findById(args.id);
            } catch (e) {
                console.error(e.message);
                return null;
            }
        },
        films: async (_: any, args: any) => {
            try {
                const films = await Film.find().skip((args.pageIndex - 1) * args.pageSize).limit(args.pageSize);
                const totalCount = await Film.estimatedDocumentCount();
                return {
                    films,
                    totalCount
                }
            } catch (e) {
                console.error(e.message);
                return null;
            }
        },
        search: async (_: any, args: any) => {
            try{
                if (args.keyword.length === 0){
                    return [];
                }
                const reg = new RegExp(args.keyword, 'i');
                const totalCount = await Film.countDocuments({title: {$regex: reg}});
                const films = await Film.find({title: {$regex: reg}}).skip((args.pageIndex - 1) * args.pageSize).limit(args.pageSize);
                return {
                    films,
                    totalCount
                }
            }catch (e) {
                console.error(e.message);
                return [];
            }
        }
    },
    Film: {
        directors: async (blog: any) => {
            try {
                return Array.from(blog.directors).map(async id => await Director.findById(id));
            } catch (e) {
                console.error(e.message);
                return [];
            }
        },
        writers: async (blog: any) => {
            try {
                return Array.from(blog.writers).map(async id => await Writer.findById(id));
            } catch (e) {
                console.error(e.message);
                return [];
            }
        },
        casts: async (blog: any) => {
            try {
                return Array.from(blog.casts).map(async id => await Actor.findById(id));
            } catch (e) {
                console.error(e.message);
                return [];
            }
        },
        genres: async (blog: any) => {
            try {
                return Array.from(blog.genres).map(async id => await Genre.findById(id));
            } catch (e) {
                console.error(e.message);
                return [];
            }
        },
        languages: async (blog: any) => {
            try {
                return Array.from(blog.languages).map(async id => await Language.findById(id));
            } catch (e) {
                console.error(e.message);
                return [];
            }
        },
    }
};

export default resolvers;

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