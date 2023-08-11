const playlistService = require("../services/playlistService")
const ApiError = require("../exceptions/api-error")

class PlaylistController {
    async createPlaylist(req,res,next) {
        try {
            const name = req.body.name
            const playList = await playlistService.createPlayList(name,req.user.id)
            return res.json(playList)
        } catch ( e ) {
            next(e)
        }
    }

    async deletePlaylist(req,res,next){
        try {
            const playlists = await playlistService.deletePlayList(req.query.id)
            return res.json(playlists)
        } catch ( e ) {
            next(e)
        }
    }

    async getPlaylists(req,res,next){
       try {
           const playlists = await playlistService.getPlaylists (req.user.id)
           return res.json ( playlists )
       } catch ( e ) {
           next(e)
       }
    }
    async addMusic(req,res,next) {
        try {
            const musicId = req.body.music._id
            const playlistId = req.body.playlist._id
            const music = await playlistService.addMusic(musicId,playlistId)
            return res.json(music)
        } catch ( e ) {
            next(e)
        }
    }

    async deleteMusic(req,res,next) {
        try {
            const musicId = req.query.musicId
            const playlistId = req.query.playlistId
            const music = await playlistService.deleteMusic(musicId,playlistId)
            return res.json(music)
        } catch ( e ) {
            next(e)
        }
    }

    async getMusicsByPlaylist(req, res, next){
        try {
            const musics = await playlistService.getMusicsByPlaylist(req.query.id)
            return res.json(musics)
        } catch ( e ) {
            next(e)
        }
    }
}

module.exports = new PlaylistController()