const Genre = require ( "../models/Genre" );

class GenreService {
    async findGenreByValue(music){
        const genres = await Genre.find({value:{$in:music.genres}})
        console.log(genres)

        const genresArray = []

        genres.map((genre)=>{

            genresArray.push(genre.value)

        })

        return genresArray
    }

    async getAllGenre(){
        const genres = await Genre.find({})
        return genres
    }
}
module.exports = new GenreService()