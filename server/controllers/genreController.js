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
}
module.exports=new GenreController()