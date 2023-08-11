const albumService = require ( "../services/albumService" )
const playlistService = require ( "../services/playlistService" );

class AlbumController {
    async createAlbum( req , res , next ) {
        try {
            const name = req.body.albumName
            const genres = req.body.genres
            const files = req.files
            const album = await albumService.createAlbum ( files ,name ,genres, req.user.id )
            return res.json ( album )
        } catch ( e ) {
            next ( e )
        }
    }

    async addMusic(req,res,next) {
        try {
            const musicId = req.body.music._id
            const albumId = req.body.album._id
            const music = await albumService.addMusic(musicId,albumId)
            return res.json(music)
        } catch ( e ) {
            next(e)
        }
    }

    async getAlbums(req,res,next){
        try {
            const limit = req.query.limit
            const albums = await albumService.getAlbums(limit)
            return res.json(albums)
        } catch ( e ) {
            next(e)
        }
    }

    async getMusicsByAlbum(req, res, next){
        try {
            const albumId = req.query.id
            const musics = await albumService.getMusicsByAlbum(albumId)
            return res.json(musics)
        } catch (e) {
            next(e)
        }
    }

    async deleteAlbum(req,res,next){
        try {
            const playlists = await albumService.deleteAlbum(req.query.id)
            return res.json(playlists)
        } catch ( e ) {
            next(e)
        }
    }

    async deleteMusic(req,res,next){
        try {
            const musicId = req.query.musicId
            const playlistId = req.query.playlistId
            const album = await albumService.deleteMusic(musicId, playlistId)
            return res.json(album)
        } catch ( e ) {
            next(e)
        }
    }
}

module.exports = new AlbumController ()