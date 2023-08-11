const Playlist = require("../models/Playlist")
const Music = require("../models/Music")
const ApiError = require ( "../exceptions/api-error" );


class PlaylistService {
    async createPlayList(name,userId){
        const playlist = new Playlist({
            name:name,
            user:userId
        })
        await playlist.save()
        return playlist
    }
    async getPlaylists(userId){
        const playlists = await Playlist.find({user:userId})
        return playlists
    }
    async deletePlayList(playlistId){
        const playlists = await Playlist.deleteMany({_id:playlistId})
        return playlists
    }

    async addMusic(musicId, playlistId){
        const playlist = await Playlist.findOne({_id:playlistId})
        if(playlist) {
            const music = await Music.updateOne ( { _id: musicId },{$push:{playlists:playlist._id}} )
            return music
        }
        throw ApiError.BadRequest('PlaylistMusic is not found')
    }

    async deleteMusic(musicId,playlistId) {
        const playlist = await Playlist.findOne({_id:playlistId})
        if(playlist) {
            const music = await Music.updateOne ( { _id: musicId },{$pull:{playlists:playlist._id}} )
            return music
        }
        throw ApiError.BadRequest('PlaylistMusic is not found')
    }

    async getMusicsByPlaylist(playlistId){
        const musics = await Music.find({playlists:{$in:playlistId}})
        return musics
    }


}
module.exports = new PlaylistService()