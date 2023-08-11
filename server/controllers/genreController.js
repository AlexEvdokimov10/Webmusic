const genreService = require("../services/genreService")


class GenreController {
    async getAllGenre(req,res,next){
        try {
            const genres = await genreService.getAllGenre()
            return res.json(genres)
        } catch ( e ) {
            next(e)
        }
    }

    async createGenre(req,res,next){
        try {
            const name = req.body.name
            const genre = await genreService.createGenre(name)
            return res.json(genre)
        } catch (e) {
            next(e)
        }
    }
}
module.exports=new GenreController()