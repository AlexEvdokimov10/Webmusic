const Genre = require ( "../models/Genre" );

class GenreService {
    async findGenreByValue(music){
        const genres = await Genre.find({value:{$in:music.genres.split(",")}})

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

    async createGenre(name){
        const genre = new Genre({
            value:name
        })
        await genre.save()
        return genre
    }
}
module.exports = new GenreService()