const Album = require ( "../models/Album" );
const FileService = require ( "./fileService" );
const Music = require ( "../models/Music" );
const ApiError = require ( "../exceptions/api-error" );
const playlistService = require ( "./playlistService" );
const GenreService = require("./genreService");

class AlbumService {
    async createAlbum(files,name,genres,userId){
        console.log(files)
        const imgName = await FileService.createAlbumImage ( files.image )
        const genresArray = await GenreService.findGenreByValue ({genres:genres} )
        const album = new Album({
            name:name,
            genre:genresArray,
            image:imgName,
            author:userId,
        })
        await album.save()
        files.musics.map(async (music)=>{
            let path = await FileService.createMusicFileAlbum ( {_id:userId} , music );
            const time = await FileService.calculateDuration ( music )
            const newMusic = new Music({
                name:music.name,
                genre:genresArray,
                path:path,
                time:time,
                description:"",
                image:imgName,
                author:userId,
                album:album._id
            })
            await newMusic.save()
        })

        return album
    }

    async getMusicsByAlbum(albumId){
        const musics = await Music.find({album:albumId})
        return musics
    }

    async getAlbums(limit){
        const albums = await Album.find().limit(limit)
        return albums
    }

    async addMusic(musicId,albumId){
        const album = await Album.findOne({_id:albumId})
        if(album) {
            const music = await Music.updateOne ( { _id: musicId },{album:albumId} )
            return music
        }
        throw ApiError.BadRequest('Album is not found')
    }

    async deleteMusic(musicId,albumId){
        const music = await Music.findOneAndUpdate ( { _id: musicId ,album: albumId},{album:""} )
        return music
    }

    async deleteAlbum(albumId){
        const albums = await Album.deleteMany({_id:albumId})
        return albums
    }
}

module.exports = new AlbumService()